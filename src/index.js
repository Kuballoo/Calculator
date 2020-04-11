import React from "react";
import ReactDOM from "react-dom";
import Option from "./Option.js";

import "./style.css";

const operationType = (x, y, prevT) => {
  const precision = 100000000;
  switch (prevT) {
    case "+":
      return parseFloat(parseInt((x + y) * precision)) / precision;
    case "-":
      return parseFloat(parseInt((y - x) * precision)) / precision;
    case "/":
      if (x !== 0) return parseFloat(parseInt((y / x) * precision)) / precision;
      else {
        error = true;
        return "Nie dziel przez zero!";
      }
    case "x":
      return parseFloat(parseInt(x * y * precision)) / precision;
    default:
      break;
  }
};

let num1 = 0;
let num2 = 0;
let prevType = "";
let error = false;
let numBreak = false;
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      value2: "",
    };
  }
  handleOption = (symbol, type) => {
    const { value, value2 } = this.state;
    var content = value;
    if (error) {
      this.setState({ value2: "" });
      error = false;
    }
    if (prevType === "=") {
      if (type === "operation" && symbol !== "=") {
        num2 = num1;
        num1 = 0;
        this.setState({ value2: num2 + " " + symbol, value: "" });
        numBreak = false;
        prevType = symbol;
      } else {
        this.setState({ value: "", value2: "" });
        num1 = 0;
        num2 = 0;
        numBreak = false;
        prevType = "";
        return;
      }
    }
    if (symbol === "CE") {
      this.setState({ value: "" });
      num1 = 0;
      numBreak = false;
    } else if (symbol === "C") {
      this.setState({ value: "", value2: "" });
      num1 = 0;
      num2 = 0;
      numBreak = false;
    } else if (symbol === "<-") {
      content = content.slice(0, -1);
      this.setState({ value: content });
      if (content === "") numBreak = false;
    } else if (
      (symbol === "/" || symbol === "x" || symbol === "-" || symbol === "+") &&
      numBreak
    ) {
      if (num2) {
        num1 = parseFloat(value);
        num2 = operationType(num1, num2, prevType);
        if (error) {
          this.setState({ value2: num2, value: "" });
          num1 = 0;
          num2 = 0;
          numBreak = false;
        } else {
          this.setState({ value2: num2 + " " + symbol, value: "" });
          num1 = 0;
        }
      } else {
        num2 = parseFloat(value);
        this.setState({ value2: num2 + " " + symbol, value: "" });
      }
      prevType = symbol;
      numBreak = false;
    } else if (type === "number" || type === "dot") {
      if (type !== "dot") numBreak = true;
      this.setState({ value: value + symbol });
    } else if (symbol === "+/-" && content && numBreak) {
      this.setState({ value: -value });
    } else if (symbol === "=" && content && numBreak && num2) {
      num1 = parseFloat(value);
      if (num1 < 0) content = `${num2} ${prevType} (${num1}) =`;
      else content = `${num2} ${prevType} ${num1} =`;

      num1 = operationType(num1, num2, prevType);
      if (error) {
        this.setState({ value2: num1, value: "" });
        num1 = 0;
        num2 = 0;
        numBreak = false;
      } else this.setState({ value: num1, value2: content });

      prevType = symbol;
      numBreak = false;
    }
  };

  handleKeyPress = (e, symbol, type) => {
    switch (e.key) {
      case "0":
        this.handleOption("0", "number");
        break;
      case "1":
        this.handleOption("1", "number");
        break;
      case "2":
        this.handleOption("2", "number");
        break;
      case "3":
        this.handleOption("3", "number");
        break;
      case "4":
        this.handleOption("4", "number");
        break;
      case "5":
        this.handleOption("5", "number");
        break;
      case "6":
        this.handleOption("6", "number");
        break;
      case "7":
        this.handleOption("7", "number");
        break;
      case "8":
        this.handleOption("8", "number");
        break;
      case "9":
        this.handleOption("9", "number");
        break;
      case "d":
        this.handleOption("<-", "clear");
        break;
      case "c":
        this.handleOption("CE", "clear");
        break;
      case "C":
        this.handleOption("C", "clear");
        break;
      case "f":
        this.handleOption("+/-", "other");
        break;
      case "=":
        this.handleOption("=", "operation");
        console.log("this should working");
        break;
      case ",":
        this.handleOption(".", "dot");
        break;
      case "/":
        this.handleOption("/", "operation");
        break;
      case "*":
        this.handleOption("x", "operation");
        break;
      case "-":
        this.handleOption("-", "operation");
        break;
      case "+":
        this.handleOption("+", "operation");
        break;
    }
  };

  render() {
    const itemsInf = [
      { name: "CE", id: 0, type: "clear" },
      { name: "C", id: 1, type: "clear" },
      { name: "<-", id: 2, type: "clear" },
      { name: "/", id: 3, type: "operation" },
      { name: "7", id: 4, type: "number" },
      { name: "8", id: 5, type: "number" },
      { name: "9", id: 6, type: "number" },
      { name: "x", id: 7, type: "operation" },
      { name: "4", id: 8, type: "number" },
      { name: "5", id: 9, type: "number" },
      { name: "6", id: 10, type: "number" },
      { name: "-", id: 11, type: "operation" },
      { name: "1", id: 12, type: "number" },
      { name: "2", id: 13, type: "number" },
      { name: "3", id: 14, type: "number" },
      { name: "+", id: 15, type: "operation" },
      { name: "+/-", id: 16, type: "another" },
      { name: "0", id: 17, type: "number" },
      { name: ".", id: 18, type: "dot" },
      { name: "=", id: 19, type: "operation" },
    ];
    return (
      <div className="calcContainer">
        <input
          type="text"
          className="display2"
          readOnly={true}
          value={this.state.value2}
        />
        <input
          type="text"
          className="display"
          readOnly={true}
          value={this.state.value}
        />
        {itemsInf.map((item) => (
          <Option
            name={item.name}
            type={item.type}
            key={item.id}
            click={this.handleOption}
            keyDown={this.handleKeyPress}
          />
        ))}
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));
