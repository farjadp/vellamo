// Demo structures + sensors. Names match the kind of asset Vellamo's
// marketing copy talks about — a Finnish quay and a berth section that
// slowly needs attention, echoing the /product page's example quote:
// "Section B needs repair within 18 months — the rest is healthy."
export const STRUCTURES = [
  {
    key: "turku-quay-4",
    name: "Turku Quay 4",
    structure_type: "quay",
    location: "Port of Turku, Finland",
    commissioned_on: "2014-06-01",
    sensors: [
      { key: "strain-a", sensor_type: "strain", unit: "µε", baseline_mean: 120, baseline_stddev: 6 },
      { key: "vibration-a", sensor_type: "vibration", unit: "mm/s", baseline_mean: 2.1, baseline_stddev: 0.3 },
      { key: "tilt-a", sensor_type: "tilt", unit: "mrad", baseline_mean: 0.4, baseline_stddev: 0.05 },
    ],
  },
  {
    key: "helsinki-west-berth",
    name: "Helsinki West Berth",
    structure_type: "berth",
    location: "Port of Helsinki, Finland",
    commissioned_on: "2011-09-15",
    sensors: [
      { key: "section-a-strain", sensor_type: "strain", unit: "µε", baseline_mean: 130, baseline_stddev: 7 },
      // Section B slowly drifts — this is the sensor that should eventually
      // cross into "watch" then "attention" as the simulator is run repeatedly.
      {
        key: "section-b-strain",
        sensor_type: "strain",
        unit: "µε",
        baseline_mean: 130,
        baseline_stddev: 7,
        drift_per_reading: 1.4,
      },
      { key: "section-b-vibration", sensor_type: "vibration", unit: "mm/s", baseline_mean: 2.4, baseline_stddev: 0.35 },
    ],
  },
];
