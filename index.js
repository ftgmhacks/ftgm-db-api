const axios = require('axios');

module.exports = async (req, res) => {
    // URL se parameters nikaalna
    const { num, key } = req.query;

    // 1. Key Check: Agar key galat hai ya nahi di gayi
    if (key !== "ytftgm77") {
        return res.status(403).json({
            ok: false,
            message: "Invalid or Missing API Key. Access Denied."
        });
    }

    // 2. Number Check
    if (!num) {
        return res.status(400).json({
            ok: false,
            message: "Please provide a number (?num=xxxx)"
        });
    }

    try {
        // Original API se data fetch karna
        const response = await axios.get(`https://bj-pak-sim-info.vercel.app/?num=${num}`);
        const data = response.data;

        // 3. Creator section ko hide/remove karna
        if (data && data.creator) {
            delete data.creator;
        }

        // Clean data wapis bhejna
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error fetching data from original source."
        });
    }
};
