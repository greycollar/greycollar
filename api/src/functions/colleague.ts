import Colleague from "../models/Colleague";

async function get({ colleagueId }: { colleagueId: string }) {
  return await Colleague.findByPk(colleagueId, {
    attributes: { exclude: ["aiEngineId"] },
    include: ["AIEngine"],
  });
}

export default { get };
