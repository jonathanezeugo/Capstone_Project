from flask import Flask, render_template, jsonify, send_from_directory, request
import json
import pandas as pd
import numpy as np
import os
import pickle

app = Flask(__name__)



#endpoint
@app.route('/')
def index():
    return "Testing flask app"

@app.route("/ml")
def model_page():
    # Return template and data
    return render_template("ml.html")

@app.route("/dashboard")
def dashboard():
    # Return template and data
    return render_template("dashboard.html")

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
    Japan_D = int(content["Japan_D"])
    China_D = int(content["China_D"])
    China_S = int(content["China_S"])
    Middle_East_Rigs = int(content["Middle_East_Rigs"])
    Canada_D = int(content["Canada_D"])
    North_Sea_S = int(content["North_Sea_S"])
    Canada_Rigs = int(content["Canada_Rigs"])
    OPEC_Crude_Oil_Portion = int(content["OPEC_Crude_Oil_Portion"])
    Total_Intl_Rigs = int(content["Total_Intl_Rigs"])
    Asia_Pacific_Rigs = int(content["Asia_Pacific_Rigs"])
    Brent_Crude_Price = int(content["Brent_Crude_Price"])
    Latin_America_Rigs = int(content["Latin_America_Rigs"])

    my_new_model = pickle.load(open('Machine_Learning/finalized_model.sav', 'rb'))

    prediction = my_new_model.predict([[Japan_D, China_D, China_S, Middle_East_Rigs, \
    Canada_D, North_Sea_S, Canada_Rigs, OPEC_Crude_Oil_Portion, \
    Total_Intl_Rigs, Asia_Pacific_Rigs, Brent_Crude_Price, Latin_America_Rigs \
    ]])
    print(prediction)
    return(jsonify({"ok": True, "prediction": prediction}))



if __name__ == "__main__":
    app.run(debug=True)