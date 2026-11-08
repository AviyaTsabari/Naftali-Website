from pathlib import Path

from app.data import MOCK_POEMS, POEMS_FILE
from app.poems import load_poems_from_file


def test_parser_reads_title_from_start_and_skips_system_lines(tmp_path: Path) -> None:
    sample = tmp_path / "poems.txt"
    sample.write_text(
        "\n".join(
            [
                "20.3.2025, 21:35 - ההודעות והשיחות מוצפנות מקצה לקצה",
                "20.3.2025, 21:37 - נפתלי יוסף: כֹּתֶרֶת",
                "",
                "שׁוּרָה רִאשׁוֹנָה",
                "",
                "שׁוּרָה שְׁנִיָּה",
                "4.4.2025, 8:17 - נפתלי יוסף: כֹּתֶרֶת שְׁנִיָּה",
                "",
                "גּוּף הַשִּׁיר",
            ]
        ),
        encoding="utf-8",
    )

    poems = load_poems_from_file(sample)

    assert len(poems) == 2
    assert poems[0].id == "poem-2025-04-04"
    assert poems[0].date == "2025-04-04"
    assert poems[0].title == "כֹּתֶרֶת שְׁנִיָּה"
    assert poems[0].body == "גּוּף הַשִּׁיר"
    assert poems[1].title == "כֹּתֶרֶת"
    assert poems[1].body == "שׁוּרָה רִאשׁוֹנָה\n\nשׁוּרָה שְׁנִיָּה"


def test_parser_gives_stable_unique_ids_for_the_same_day(tmp_path: Path) -> None:
    sample = tmp_path / "poems.txt"
    sample.write_text(
        "\n".join(
            [
                "20.3.2025, 21:37 - נפתלי יוסף: כֹּתֶרֶת א",
                "",
                "גּוּף א",
                "20.3.2025, 22:10 - נפתלי יוסף: כֹּתֶרֶת ב",
                "",
                "גּוּף ב",
            ]
        ),
        encoding="utf-8",
    )

    poems = load_poems_from_file(sample)

    assert [poem.id for poem in poems] == ["poem-2025-03-20", "poem-2025-03-20-2"]
    assert [poem.title for poem in poems] == ["כֹּתֶרֶת א", "כֹּתֶרֶת ב"]


def test_poems_file_loads_titled_poems() -> None:
    poems = load_poems_from_file(POEMS_FILE)

    assert POEMS_FILE.exists()
    assert len(poems) >= 40
    assert poems == MOCK_POEMS
    assert all(poem.title and poem.date and poem.body and poem.id for poem in poems)
    assert poems[0].date >= poems[-1].date
    assert any("\n\n" in poem.body for poem in poems)
