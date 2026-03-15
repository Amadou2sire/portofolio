from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from data import load_data, save_data

app = FastAPI(title="CV Portfolio API", version="1.0.0")

# Allow React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/all")
async def get_all():
    return load_data()

@app.post("/api/update")
async def update_data(payload: dict = Body(...)):
    save_data(payload)
    return {"status": "success", "message": "Données mises à jour avec succès"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
