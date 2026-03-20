const axios = require('axios');

module.exports = async (req, res) => {
    const { num } = req.query;

    if (!num) {
        return res.status(400).json({
            ok: false,
            message: "Aby Number Dy iss Trha (?num=300xxxxxxx)"
        });
    }

    try {
        const response = await axios.get(`https://bj-pak-sim-info.vercel.app/?num=${num}`);
        let data = response.data;

        
        if (data.creator) {
            delete data.creator;
        }

        
        const finalResponse = {
            status: "Success",
            owner: "FTGM HACKS",
            main_web : "https://ftgmtools.pages.dev",
            telegram: "https://t.me/FTGMHACKS",
            ...data
        };

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(finalResponse);

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Error fetching data from source."
        });
    }
};
