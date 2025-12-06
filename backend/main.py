from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.post("/attendance/{roll_number} {date} {time} {subject}")
def create_attendance(roll_number: int, date: str, time: str, subject: str):
    return {"message": "Attendance created"}