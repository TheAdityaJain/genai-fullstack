from transformers import pipeline, set_seed

def generate_bollywood_story(prompt, max_length=100, temperature=1.0):
    # Load pipeline with GPT-2
    generator = pipeline("text-generation", model="gpt2")

    # Optional: Make results reproducible
    set_seed(42)

    # Generate story
    story = generator(
        prompt,
        max_length=max_length,
        temperature=temperature,
        num_return_sequences=1,
        pad_token_id=50256  # Set pad token for GPT-2
    )

    return story[0]['generated_text']


if __name__ == "__main__":
    print("🎬 Welcome to the Bollywood Story Generator 🎬")
    prompt = input("👉 Enter your story prompt: ")
    
    try:
        temp = float(input("🔥 Enter creativity (temperature: 0.7–1.3 recommended): "))
        length = int(input("📏 Enter max story length (tokens): "))
    except:
        print("⚠️ Invalid input. Using defaults.")
        temp = 1.0
        length = 100

    print("\n📝 Generating story...\n")
    story = generate_bollywood_story(prompt, max_length=length, temperature=temp)
    print("🎭 Your Bollywood story:\n")
    print(story)
