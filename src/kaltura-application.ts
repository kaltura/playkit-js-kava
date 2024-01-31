type ApplicationType = { [app: string]: string };

const KalturaApplication: ApplicationType = {
  KMC: '0',
  KMS: '1',
  KAF: '2',
  PITCH: '3',
  KMS_GO: '4',
  WEBCASTING: '5',
  PERSONAL_CAPTURE: '6',
  KME: '7',
  KME_MOBILE_APP: '8',
  PATH: '9',
  LECTURE_CAPTURE: '10',
  EP: '11',
  CHAT_AND_COLLABORATION: '12',
  ANALYTICS: '13',
  EXPRESS_CAPTURE: '14',
  KPF: '15',
  KAF_GO: '16',
  SITES: '17',
  STUDIO: '18'
};

export { KalturaApplication };
export type { ApplicationType };
