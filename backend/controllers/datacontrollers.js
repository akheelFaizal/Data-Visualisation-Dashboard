const DataModel = require("../models/record"); 

const getAllData = async (req, res) => {
  try {
    const data = await DataModel.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getFilteredData = async (req, res) => {
  const filters = {};

  if (req.query.topic) filters.topic = req.query.topic;
  if (req.query.region) filters.region = req.query.region;
  if (req.query.sector) filters.sector = req.query.sector;
  if (req.query.country) filters.country = req.query.country;
  if (req.query.city) filters.city = req.query.city;
  if (req.query.end_year) filters.end_year = Number(req.query.end_year);

  try {
    const data = await DataModel.find(filters);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDistinctFilterItems = async (req, res) => {
  try {
    const fields = [
      "end_year",
      "topic",
      "sector",
      "region",
      "pestle",
      "source",
      "swot",
      "country",
      "city",
    ];

    const result = {};

    for (const field of fields) {
      result[field] = await DataModel.distinct(field);
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const intensityByYear = async (req, res) => {
  try {
    const {
      end_year,
      topic,
      sector,
      region,
      pestle,
      source,
      swot,
      country,
      city,
    } = req.query;

    const matchStage = {};
    if (end_year) matchStage.end_year = parseInt(end_year);
    if (topic) matchStage.topic = topic;
    if (sector) matchStage.sector = sector;
    if (region) matchStage.region = region;
    if (pestle) matchStage.pestle = pestle;
    if (source) matchStage.source = source;
    if (swot) matchStage.swot = swot;
    if (country) matchStage.country = country;
    if (city) matchStage.city = city;

    const data = await DataModel.aggregate([
      { $match: { ...matchStage, end_year: { $ne: null } } },
      { $group: { _id: "$end_year", totalIntensity: { $sum: "$intensity" } } },
      { $sort: { _id: 1 } },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const likelihoodByTopic = async (req, res) => {
  try {
    const {
      end_year,
      topic,
      sector,
      region,
      pestle,
      source,
      swot,
      country,
      city,
    } = req.query;

    const matchStage = {};
    if (end_year) matchStage.end_year = parseInt(end_year);
    if (topic) matchStage.topic = topic;
    if (sector) matchStage.sector = sector;
    if (region) matchStage.region = region;
    if (pestle) matchStage.pestle = pestle;
    if (source) matchStage.source = source;
    if (swot) matchStage.swot = swot;
    if (country) matchStage.country = country;
    if (city) matchStage.city = city;

    const data = await DataModel.aggregate([
      { $match: { ...matchStage, topic: { $ne: "" } } },
      { $group: { _id: "$topic", avgLikelihood: { $avg: "$likelihood" } } },
      { $sort: { avgLikelihood: -1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const relevanceByRegion = async (req, res) => {
  try {
    const {
      end_year,
      topic,
      sector,
      region,
      pestle,
      source,
      swot,
      country,
      city,
    } = req.query;

    const matchStage = {};
    if (end_year) matchStage.end_year = parseInt(end_year);
    if (topic) matchStage.topic = topic;
    if (sector) matchStage.sector = sector;
    if (region) matchStage.region = region;
    if (pestle) matchStage.pestle = pestle;
    if (source) matchStage.source = source;
    if (swot) matchStage.swot = swot;
    if (country) matchStage.country = country;
    if (city) matchStage.city = city;

    const data = await DataModel.aggregate([
      { $match: { ...matchStage, region: { $ne: "" } } },
      { $group: { _id: "$region", avgRelevance: { $avg: "$relevance" } } },
      { $sort: { avgRelevance: -1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const topicFrequency = async (req, res) => {
  try {
    const { end_year, topic, sector, region, pestle, source, country, city } =
      req.query;

    const matchStage = {};
    if (end_year) matchStage.end_year = parseInt(end_year);
    if (topic) matchStage.topic = topic;
    if (sector) matchStage.sector = sector;
    if (region) matchStage.region = region;
    if (pestle) matchStage.pestle = pestle;
    if (source) matchStage.source = source;
    if (country) matchStage.country = country;
    if (city) matchStage.city = city;

    const data = await DataModel.aggregate([
      { $match: { ...matchStage, topic: { $ne: "" }, sector: { $ne: "" } } },
      {
        $group: {
          _id: { topic: "$topic", sector: "$sector" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const intensity = async (req, res) => {
  try {
    const totalIntensity = await DataModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$intensity" },
        },
      },
    ]);

    res.json({ intensity: totalIntensity[0]?.total || 0 });
  } catch (error) {
    console.error("Intensity API error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const likelihood = async (req, res) => {
  try {
    const likelihood = await DataModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$likelihood" },
        },
      },
    ]);

    res.json({ likelihood: likelihood[0]?.total || 0 });
  } catch (error) {
    console.error("Likelihood API error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const relevance = async (req, res) => {
  try {
    const relevance = await DataModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$relevance" },
        },
      },
    ]);

    res.json({ relevance: relevance[0]?.total || 0 });
  } catch (error) {
    console.error("Relevance API error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllData,
  getFilteredData,
  getDistinctFilterItems,
  intensityByYear,
  likelihoodByTopic,
  relevanceByRegion,
  topicFrequency,
  intensity,
  likelihood,
  relevance,
};
