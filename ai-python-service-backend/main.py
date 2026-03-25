from app.agent import qualify_lead

if __name__ == "__main__":
    result = qualify_lead(
        name="John",
        message="Hi, I'm interested in automation services for my real estate agency. Can you help?"
    )

    print("\n=== AI RESPONSE ===\n")
    print(result)
    print("\nType:", type(result))
 
