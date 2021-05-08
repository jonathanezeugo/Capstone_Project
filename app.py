#Import Modules
from flask import Flask, render_template, jsonify, send_from_directory, request
import json
import pandas as pd
import numpy as np
import os
import pickle

app = Flask(__name__)

my_new_model = pickle.load(open('Machine_Learning/finalized_model.sav', 'rb'))
x_scaler = pickle.load(open('Machine_Learning/saved_x_scaler.sav', 'rb'))


#endpoint
@app.route('/')
def index():
    return render_template("index.html")

@app.route("/ml")
def model_page():
    # Return template and data
    return render_template("ml.html")

@app.route("/dashboard")
def dashboard():
    # Return template and data
    return render_template("visualizations1.html")

@app.route("/dashboard2")
def dashboard2():
    # Return template and data
    return render_template("visualizations2.html")

@app.route("/analysis")
def analysis():
    # Return template and data
    return render_template("analysis.html")

@app.route("/dashboardmap")
def map():
    # Return template and data
    return render_template("map.html")

@app.route("/data")
def data():
    # Return template and data
    return render_template("data.html")


@app.route("/resources")
def resources():
    # Return template and data
    return render_template("resources.html")

@app.route("/about")
def about_us():
    # Return template and data
    return render_template("about.html")

@app.route("/makePredictions", methods=["POST"])
def makePredictions():
    content = request.json["data"]

    # parse
    Total_International_Rigs = int(content["totalRigs"])
    Asia_Rigs = int(content["asiaRigs"])
    Brent_Oil_Price = int(content["brentPrice"])
    Latin_Rigs = int(content["latinRigs"])

    user_input = [Total_International_Rigs, Asia_Rigs, Brent_Oil_Price, Latin_Rigs]

    user_input_scaled = x_scaler.transform([user_input])

    prediction = my_new_model.predict(user_input_scaled).tolist()
    
    return(jsonify({"ok": True, "prediction": prediction}))



if __name__ == "__main__":
    app.run(debug=True)