from transformers import pipeline, set_seed
import random

# Genre-based prompts
genre_templates = {
    "romance": "Two lovers from rival families meet in Mumbai and...",
    "action": "A retired gangster is pulled back into the Mumbai underworld when...",
    "horror": "In an abandoned film studio in Andheri, something terrifying happens when...",
    "comedy": "A clumsy wedding planner is hired for a celebrity shaadi, but..."
}

def generate_story(prompt, max_length=100, temperature=1.0):
    generator = pipeline("text-generation", model="gpt2")
    set_seed(42)
    story = generator(
        prompt,
        max_new_tokens=max_length,
        temperature=temperature,
        num_return_sequences=1,
        pad_token_id=50256
    )
    return story[0]['generated_text']

def get_random_title():
    words = ["Love", "Revenge", "Magic", "Heart", "Mumbai", "Shadow", "Dreams", "Destiny"]
    return "💫 Title: " + " ".join(random.sample(words, 2))

if __name__ == "__main__":
    print("🎬 Welcome to the Enhanced Bollywood Story Generator 🎬")

    genre = input("🎭 Choose a genre (romance, action, horror, comedy): ").lower()
    prompt = genre_templates.get(genre, input("👉 Enter your own story prompt: "))

    temp = float(input("🔥 Enter creativity (temperature: 0.7–1.3 recommended): "))
    length = int(input("📏 Enter max story length (tokens): "))

    print("\n📝 Generating story...\n")
    title = get_random_title()
    story = generate_story(prompt, max_length=length, temperature=temp)

    print(title)
    print(story)

    save = input("\n💾 Do you want to save the story to a file? (y/n): ")
    if save.lower() == "y":
        with open("generated_bollywood_story.txt", "w", encoding="utf-8") as f:
            f.write(title + "\n\n" + story)
        print("✅ Story saved as 'generated_bollywood_story.txt'")
