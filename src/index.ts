import express, {} from 'express';

const app = express();
let DAMAGE_SYSTEM = "";

const DAMAGE_SYSTEM_VALUES = {
  navigation: "NAV-01",
  communications: "COM-02",
  life_support: "LIFE-03",
  engines: "ENG-04",
  deflector_shield: "SHLD-05"
}

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/status', (_, res) => {
  DAMAGE_SYSTEM = getRandomDamageSystem();
  res.json({ damaged_system: DAMAGE_SYSTEM });
});

app.get('/repair-bay', (_, res) => {
  res.render('response.html', { value: DAMAGE_SYSTEM_VALUES[DAMAGE_SYSTEM] });
});

app.post('/teapot', (_, res) => {
  res.status(418).send();
});

app.get("/phase-change-diagram", (req, res) => {
  const slopeSaturatedLiquid = 4061.22449
  const bSaturatedLiquid = -4.214285714
  const slopeSaturatedVapor = -0.3317053656
  const bSaturatedVapor = 10.00116097
  const pressure = req.query.pressure as string;

  if (!pressure) {
    res.status(400).send("Pressure query parameter is required");
  } else {
    const specificVolumeLiquid = (parseFloat(pressure) - bSaturatedLiquid) / slopeSaturatedLiquid;
    const specificVolumeVapor = (parseFloat(pressure) - bSaturatedVapor) / slopeSaturatedVapor;

    res.json({
      specific_volume_liquid: specificVolumeLiquid.toFixed(5),
      specific_volume_vapor: specificVolumeVapor.toFixed(5)
    });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


function getRandomDamageSystem(): any {
  const systems = ["navigation", "communications", "life_support", "engines", "deflector_shield"]
  const randomIndex = Math.floor(Math.random() * systems.length);
  return systems[randomIndex];
};
