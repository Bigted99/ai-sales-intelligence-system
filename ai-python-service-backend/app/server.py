from fastapi import FastAPI
from pydantic import BaseModel
from app.agent import qualify_lead

app = FastAPI()



class LeadRequest(BaseModel):
    name: str
    message: str



class LeadResponse(BaseModel):
    qualification_score: int
    intent: str
    urgency: str
    summary: str
    objection_risk: str
    budget_confidence: str
    suggested_opening_message: str
    recommended_action: str
    confidence_level: str

@app.post("/qualify-lead")
def qualify_lead_endpoint(request: LeadRequest):
    result = qualify_lead(request.name, request.message)
    return result
@app.get("/")
def root():
    return {"status": "server running"}