export const wasteData = [
    {
        month: "January",
        paper: 120,
        plastic: 85,
        metal: 43,
        glass: 67,
        eWaste: 21,
        organic: 145
    },
    {
        month: "February",
        paper: 132,
        plastic: 91,
        metal: 38,
        glass: 71,
        eWaste: 18,
        organic: 152
    },
    {
        month: "March",
        paper: 141,
        plastic: 104,
        metal: 45,
        glass: 78,
        eWaste: 23,
        organic: 168
    },
    {
        month: "April",
        paper: 158,
        plastic: 112,
        metal: 51,
        glass: 73,
        eWaste: 27,
        organic: 175
    },
    {
        month: "May",
        paper: 165,
        plastic: 118,
        metal: 49,
        glass: 80,
        eWaste: 29,
        organic: 182
    },
    {
        month: "June",
        paper: 173,
        plastic: 126,
        metal: 53,
        glass: 83,
        eWaste: 31,
        organic: 190
    }
];

export const wasteColors = {
    paper: "#0DBADE",
    plastic: "#0FC2D5",
    metal: "#12CACC",
    glass: "#15D1C3",
    eWaste: "#17D8BD",
    organic: "#18DCB7"
};

export const wasteTotals = {
    paper: wasteData.reduce((sum, month) => sum + month.paper, 0),
    plastic: wasteData.reduce((sum, month) => sum + month.plastic, 0),
    metal: wasteData.reduce((sum, month) => sum + month.metal, 0),
    glass: wasteData.reduce((sum, month) => sum + month.glass, 0),
    eWaste: wasteData.reduce((sum, month) => sum + month.eWaste, 0),
    organic: wasteData.reduce((sum, month) => sum + month.organic, 0)
};

export const wasteLocations = [
    {
        id: 1,
        name: "Central Collection Point",
        lat: 40.7128,
        lng: -74.0060,
        wasteTypes: ["paper", "plastic", "metal", "glass", "eWaste", "organic"],
        totalCollected: 879
    },
    {
        id: 2,
        name: "North District Facility",
        lat: 40.8128,
        lng: -73.9660,
        wasteTypes: ["paper", "plastic", "glass", "organic"],
        totalCollected: 543
    },
    {
        id: 3,
        name: "South Tech Recycling",
        lat: 40.6528,
        lng: -74.0360,
        wasteTypes: ["eWaste", "metal"],
        totalCollected: 231
    },
    {
        id: 4,
        name: "East Community Center",
        lat: 40.7328,
        lng: -73.9260,
        wasteTypes: ["paper", "plastic", "organic"],
        totalCollected: 412
    },
    {
        id: 5,
        name: "West Industrial Park",
        lat: 40.7028,
        lng: -74.1160,
        wasteTypes: ["metal", "glass", "eWaste"],
        totalCollected: 356
    }
];

export const recyclingEntities = [
    {
        name: "EcoRecycle Inc.",
        wasteCollected: {
            paper: 420,
            plastic: 320,
            metal: 110,
            glass: 180,
            eWaste: 65,
            organic: 0
        }
    },
    {
        name: "GreenLife Processors",
        wasteCollected: {
            paper: 210,
            plastic: 150,
            metal: 0,
            glass: 0,
            eWaste: 0,
            organic: 650
        }
    },
    {
        name: "MetalWorks Co.",
        wasteCollected: {
            paper: 0,
            plastic: 0,
            metal: 160,
            glass: 0,
            eWaste: 84,
            organic: 0
        }
    },
    {
        name: "GlassRenew",
        wasteCollected: {
            paper: 0,
            plastic: 0,
            metal: 0,
            glass: 272,
            eWaste: 0,
            organic: 0
        }
    },
    {
        name: "Landfill",
        wasteCollected: {
            paper: 259,
            plastic: 166,
            metal: 0,
            glass: 0,
            eWaste: 0,
            organic: 362
        }
    }
];

export const calculateDonationStats = () => {
    const totalByType = { ...wasteTotals };

    const donatedByType = {
        paper: 0,
        plastic: 0,
        metal: 0,
        glass: 0,
        eWaste: 0,
        organic: 0
    };

    recyclingEntities.forEach(entity => {
        if (entity.name !== "Landfill") {
            Object.keys(entity.wasteCollected).forEach(type => {
                donatedByType[type] += entity.wasteCollected[type];
            });
        }
    });

    const landfillByType = {};
    const landfill = recyclingEntities.find(entity => entity.name === "Landfill");

    if (landfill) {
        Object.keys(landfill.wasteCollected).forEach(type => {
            landfillByType[type] = landfill.wasteCollected[type];
        });
    }

    return {
        donated: donatedByType,
        landfill: landfillByType,
        donationPercentage: Object.keys(totalByType).map(type => ({
            type,
            percentage: Math.round((donatedByType[type] / totalByType[type]) * 100)
        }))
    };
};