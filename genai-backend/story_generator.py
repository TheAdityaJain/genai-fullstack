from transformers import pipeline, set_seed
import random

genre_templates = {
    "romance": "Two lovers from rival families meet in Mumbai and...",
    "action": "A retired gangster is pulled back into the Mumbai underworld when...",
    "horror": "In an abandoned film studio in Andheri, something terrifying happens when...",
    "comedy": "A clumsy wedding planner is hired for a celebrity shaadi, but..."
}


def get_prompt(genre, custom_prompt):
    return genre_templates.get(genre.lower(), custom_prompt or "Once upon a time in Mumbai...")

def clean_output(text):
    banned_phrases = [
        "See full summary »",
        "Full cast and crew",
        "User reviews",
        "Photos",
        "Metascore",
        "IMDbPro",
        "Parents Guide"
    ]
    for phrase in banned_phrases:
        text = text.replace(phrase, "")
    return text.strip()

def generate_story(prompt, max_length=100, temperature=1.0):
    generator = pipeline("text-generation", model="EleutherAI/gpt-neo-125M")

    set_seed(42)
    result = generator(
        prompt,
        max_new_tokens=max_length,
        temperature=temperature,
        num_return_sequences=1,
        pad_token_id=50256
    )
    raw_text = result[0]['generated_text']
    return clean_output(raw_text)

def generate_title():
    words = ["Love", "Revenge", "Magic", "Heart", "Mumbai", "Shadow", "Dreams", "Destiny"]
    return " ".join(random.sample(words, 2))


# Clean any unfinished sentence at the end
import re

def clean_output(text):
    # Remove known garbage phrases
    text = re.sub(r"See full summary »", "", text)
    # End on the last full sentence
    sentences = re.split(r'(?<=[.!?]) +', text)
    return " ".join(sentences[:-1]) + sentences[-1].split('.')[0] + '.' if sentences else text
