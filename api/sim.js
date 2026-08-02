const axios = require('axios');

module.exports = async (req, res) => {
    const referer = req.headers.referer || "";
    const origin = req.headers.origin || "";
    
    const allowedDomain = "ftgmdb.pages.dev";

    if (!referer.includes(allowedDomain) && !origin.includes(allowedDomain)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(403).send(JSON.stringify({
            ok: false,
            message: "Chutiya Detected!. We are Detect that you are a Chutiya Copy Paster so This Api is Not Working For You",
            owner: "FTGM HACKS OFFICIAL"
        }, null, 2));
    }

    const { num } = req.query;

    if (!num) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).send(JSON.stringify({
            ok: false,
            message: "Please provide a number (?num=300xxxxxxx)"
        }, null, 2));
    }

    try {
        const response = await axios.get(`https://simsowner.pk/ajax-handler.php?number=${num}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
            }
        });
        
        let data = response.data;
        let simData = {};

        if (Array.isArray(data) && data.length > 0) {
            simData = data[0];
        } else if (data && typeof data === 'object' && !Array.isArray(data)) {
            simData = data;
        }

        if (simData.creator) {
            delete simData.creator;
        }

        const finalResponse = {
            status: "Success",
            owner: "FTGM HACKS",
            whatsapp: "https://wa.me/+923104882921",
            telegram: "https://t.me/FTGMHACKS",
            ...simData
        };

        res.setHeader('Access-Control-Allow-Origin', `https://${allowedDomain}`);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(finalResponse, null, 2));

    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send(JSON.stringify({ 
            ok: false, 
            message: "Source API Error or Down" 
        }, null, 2));
    }
};
