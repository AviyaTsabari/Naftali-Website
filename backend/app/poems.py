from __future__ import annotations

import re
from pathlib import Path

from app.schemas import Poem

HEADER = re.compile(
    r"^(\d{1,2})\.(\d{1,2})\.(\d{4}),\s+(\d{1,2}:\d{2})\s+-\s+(.*)$"
)
AUTHOR_PREFIX = "נפתלי יוסף:"
EMOJI = re.compile(
    r"[\U0001F300-\U0001FAFF\U00002700-\U000027BF\U0000FE0F\U0000200D]+"
)
def load_poems_from_file(path: Path) -> list[Poem]:
    text = path.read_text(encoding="utf-8-sig")
    poems: list[Poem] = []
    seen: dict[str, int] = {}

    for day, month, year, _time, payload in _iter_messages(text):
        if not payload.startswith(AUTHOR_PREFIX):
            continue
        content = payload[len(AUTHOR_PREFIX) :].strip()
        title, body = _split_title_body(content)
        if not title:
            continue
        iso_date = f"{year}-{int(month):02d}-{int(day):02d}"
        seen[iso_date] = seen.get(iso_date, 0) + 1
        suffix = "" if seen[iso_date] == 1 else f"-{seen[iso_date]}"
        poems.append(
            Poem(
                id=f"poem-{iso_date}{suffix}",
                date=iso_date,
                title=title,
                body=body,
            )
        )

    poems.sort(key=lambda poem: poem.date, reverse=True)
    return poems


def _iter_messages(text: str):
    current: re.Match[str] | None = None
    lines: list[str] = []
    for raw in text.splitlines():
        line = raw.replace("\u200f", "").replace("\u200e", "").strip()
        match = HEADER.match(line)
        if match:
            if current is not None:
                yield (*current.groups()[:4], "\n".join(lines).strip())
            current = match
            lines = [match.group(5)]
        elif current is not None:
            lines.append(line)
    if current is not None:
        yield (*current.groups()[:4], "\n".join(lines).strip())


def _split_title_body(content: str) -> tuple[str, str]:
    lines = content.splitlines()
    title_index = next((index for index, line in enumerate(lines) if line.strip()), None)
    if title_index is None:
        return "", ""

    title = EMOJI.sub("", lines[title_index].strip()).strip(" -")
    body_lines = lines[title_index + 1 :]
    while body_lines and not body_lines[0].strip():
        body_lines.pop(0)
    while body_lines and not body_lines[-1].strip():
        body_lines.pop()
    body = "\n".join(line.rstrip() for line in body_lines)
    if not body.strip():
        body = title
    return title, body
