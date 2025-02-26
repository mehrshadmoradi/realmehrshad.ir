export type ContentRef = {
  scrollToSection: (id: string) => void;
};

export type MenuItems = {
  name: string;
  home: string;
  about: string;
  resume: string;
  skills: string;
  projects: string;
  services: string;
  contact: string;
};

export type ContentItems = {
  about: {
    title: string;
    main: string;
    text: string;
    keys: {
      name: string;
      dob: string;
      address: string;
      email: string;
      phone: string;
    };
    values: {
      name: string;
      dob: string;
      address: string;
      email: string;
      phone: string;
    };
  };
  resume: {
    title: string;
    download: string;
    keys: {
      frontend: string;
      projects: string;
      workExperience: string;
      skills: string;
      softSkills: string;
    };
    values: {
      frontend: string;
      projects: string;
      workExperience: string;
      skills: string;
      softSkills: string;
    };
  };
  skills: {
    title: string;
  };
  projects: {
    title: string;
  };
  services: {
    title: string;
    subtitle: string;
    text: {
      service1: string;
      service2: string;
      service3: string;
      service4: string;
      service5: string;
    };
  };

  contact: {
    title: string;
  };
};
export type FormTexts = {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
  placeHolder: {
    fullName: string;
    email: string;
    phoneNumber: string;
    message: string;
  };
  submit: {
    submit: string;
    sending: string;
  };
  messages: {
    success: string;
    error: string;
  };
  errors: {
    fullName: string;
    email: {
      required: string;
      invalidEmail: string;
    };
    phoneNumber: {
      required: string;
      invalidNumber: string;
    };
    message: {
      required: string;
      minLength: string;
    };
  };
};

export interface FormState {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}
export interface MapState {
  center: { lat: number; lng: number };
  zoom: number;
  markerPosition: { lat: number; lng: number };
}

export interface IProjectDescriptions {
  todo: string;
  weatherApp: string;
  khashimelk: string;
}
