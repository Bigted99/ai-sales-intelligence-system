import json
import re
from app.prompts import build_prompt
from app.llm import local_model


def extract_json(text: str):
    match = re.search(r'\{.*\}', text, re.DOTALL)
    if match:
        return match.group(0)
    raise ValueError("No JSON found")


def qualify_lead(name: str, message: str):
    prompt = build_prompt(name, message)

    try:
        raw_response = local_model(prompt).strip()

        # Extract clean JSON
        clean_json = extract_json(raw_response)

        parsed = json.loads(clean_json)

        return parsed

    except Exception as e:
        #  FAILSAFE (VERY IMPORTANT)
        return {
            "qualification_score": 50,
            "intent_level": "medium",
            "urgency_level": "low",
            "human_summary": "AI failed — fallback applied",
            "objection_risk": "medium",
            "budget_confidence": "low",
            "opening_message": "Hi, thanks for reaching out. Can you share more details?",
            "next_action": "Follow up manually",
            "confidence_level": "low"
        } 


