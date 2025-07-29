const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid data format" });
    }

    const full_name = "john_doe"; // change if needed
    const dob = "17091999";       // change if needed
    const email = "john@xyz.com"; // change if needed
    const roll_number = "ABCD123"; // change if needed

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let allAlphabets = "";

    data.forEach(item => {
      if (!isNaN(item)) {
        const num = parseInt(item);
        sum += num;
        (num % 2 === 0 ? even_numbers : odd_numbers).push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        allAlphabets += item;
      } else {
        special_characters.push(item);
      }
    });

    const reversed = allAlphabets.split("").reverse();
    const concat_string = reversed
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: `${full_name}_${dob}`,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ is_success: false, message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
