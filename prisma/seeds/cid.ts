import { importacaoCID } from "./importWorkers/importacaoCIDs";

export async function insertCids() {
  await importacaoCID("./datasources/cids.csv");
}
