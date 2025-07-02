from transformers import pipeline

generator = pipeline("text-generation", model="gpt2")
result = generator("I watched a movie called Final Destination and it was ", max_length=50, num_return_sequences=1)

print(result[0]['generated_text'])
