const shortid = require('shortid');
const URL = require('../model/url'); // Assuming your model file exports the URL model correctly

async function handleCreateShortURL(req, res) {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        // Check if the long URL already exists in the database
        let urlRecord = await URL.findOne({ redirectURL: url });

        if (urlRecord) {
            // Render the existing short URL directly in the UI
            return res.render('home', { id: urlRecord.shortId });
        }

        // Generate a new shortId
        const shortId = shortid.generate();

        // Create a new URL record
        urlRecord = await URL.create({
            shortId,
            redirectURL: url,
            visitHistory: [],
            createdBy: req.user._id // Assuming req.user._id is available after authentication
        });

        // Render the home view with the new shortId
        return res.render('home', { id: shortId });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
}


async function handleClicks(req, res) {
    const shortId = req.params.shortId;

    try {
        // Find the URL by shortId
        const url = await urlmodel.findOne({ shortId });

        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        // Increment visit count
        url.visitCount += 1;

        // Add timestamp to visit history
        url.visitHistory.push({ timestamp: Date.now() });

        // Save updated URL document
        await url.save();

        // Redirect to the original URL
        res.redirect(url.redirectURL);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}


module.exports = { handleCreateShortURL, handleClicks };
