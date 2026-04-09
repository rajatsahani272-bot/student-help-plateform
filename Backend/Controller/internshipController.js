const Internship = require("../models/Internship");

// 1. SYNC INTERNSHIPS (SAFE + NO CRASH)
exports.syncInternships = async () => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const res = await fetch("https://jobicy.com/api/v2/remote-jobs", {
      signal: controller.signal
    });

    clearTimeout(timeout);

    const data = await res.json();

    if (!data.jobs) {
      console.log("Invalid API response");
      return;
    }

    const internships = data.jobs.slice(0, 4);

    for (let job of internships) {
      await Internship.updateOne(
        { jobId: job.url },
        {
          $setOnInsert: {
            jobId: job.url,
            title: job.jobTitle || "No Title",
            company: job.companyName || "Unknown",
            location: job.jobGeo || "Remote",
            url: job.url,
            skills: Array.isArray(job.tags) && job.tags.length > 0
              ? job.tags
              : ["General"]
          }
        },
        { upsert: true }
      );
    }

    console.log("Internships synced successfully");
  } catch (err) {
    console.log("Sync failed but server running:", err.message);
  }
};

// 2. GET INTERNSHIPS (SAFE)
exports.getInternships = async (req, res) => {
  try {
    const data = await Internship.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching internships" });
  }
};

// 3. SAVE INTERNSHIP (SAFE)
exports.saveInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const internship = await Internship.findById(id);

    if (!internship) {
      return res.status(404).json({ msg: "Internship not found" });
    }

    if (!internship.savedBy.includes(userId)) {
      internship.savedBy.push(userId);
      await internship.save();
    }

    res.json({ msg: "Saved Successfully" });

  } catch (err) {
    console.log("Save error:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};