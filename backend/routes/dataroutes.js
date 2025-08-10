const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/datacontrollers");

router.get("/", getAllData);

router.get("/filter", getFilteredData);

router.get("/api/filters", getDistinctFilterItems);

router.get("/api/visualization/intensity-by-year", intensityByYear);

router.get("/api/visualization/likelihood-by-topic", likelihoodByTopic);

router.get("/api/visualization/relevance-by-region", relevanceByRegion);

router.get("/api/visualization/topic-frequency-by-sector", topicFrequency);

router.get("/api/metrics/intensity", intensity);

router.get("/api/metrics/likelihood", likelihood);

router.get("/api/metrics/relevance", relevance);

module.exports = router;
