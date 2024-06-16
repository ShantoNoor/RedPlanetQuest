import { formSchema } from "../schemas/form.schema";

describe("Form Validation", () => {
  it("should validate correct form data successfully", () => {
    const data = {
      personalInformation: {
        fullName: "John Doe",
        dateOfBirth: "1990-01-01",
        nationality: "American",
        email: "john.doe@example.com",
        phone: "+8801982897389",
        address: "123 Main St, Anytown, USA",
        gender: "male",
        occupation: "Engineer",
        education: "B.Sc. MIT 200",

        reasonForVisit:
          "I am passionate about space exploration and want to experience Mars firsthand.",
      },
      travelPreferences: {
        departureDate: "2024-12-01",
        returnDate: "2025-01-01",
        accommodationPreference: "space hotel",
        specialRequests: "Vegetarian meals",
      },
      healthSafety: {
        chronicIllnesses: true,
        takingMedication: true,
        majorSurgeries: true,
        allergies: true,
        emergencyContact: {
          fullName: "Jane Doe",
          relation: "Sister",
          phone: "+8801982897389",
          email: "jane.doe@example.com",
          address: "456 Elm St, Anytown, USA",
        },
        medicalConditions: {
          chronicIllnesses: "Asthma",
          takingMedication: "Inhaler",
          majorSurgeries: "Appendectomy",
          allergies: "Peanuts",
        },
      },
    };

    const result = formSchema.safeParse(data);
    expect(result.success).toBe(true);
  });

  it("should fail for missing required fields", () => {
    const incompleteData = {
      personalInformation: {
        fullName: "John Doe",
        dateOfBirth: "1990-01-01",
        nationality: "American",
        phone: "+8801982897389",
        // Missing email
        address: "123 Main St, Anytown, USA",
        gender: "male",
        occupation: "Engineer",
        education: "B.Sc. MIT 200",
        reasonForVisit:
          "I am passionate about space exploration and want to experience Mars firsthand.",
      },
      travelPreferences: {
        departureDate: "2024-12-01",
        returnDate: "2025-01-01",
        accommodationPreference: "space hotel",
        specialRequests: "Vegetarian meals",
      },
      healthSafety: {
        chronicIllnesses: true,
        takingMedication: true,
        majorSurgeries: true,
        allergies: true,
        emergencyContact: {
          fullName: "Jane Doe",
          relation: "Sister",
          phone: "+8801982897389",
          email: "jane.doe@example.com",
          address: "456 Elm St, Anytown, USA",
        },
        medicalConditions: {
          chronicIllnesses: "Asthma",
          takingMedication: "Inhaler",
          majorSurgeries: "Appendectomy",
          allergies: "Peanuts",
        },
      },
    };

    const result = formSchema.safeParse(incompleteData);
    expect(result.success).toBe(false);
  });

  it("should fail for invalid email format", () => {
    const invalidEmailData = {
      personalInformation: {
        fullName: "John Doe",
        dateOfBirth: "1990-01-01",
        nationality: "American",
        email: "invalid_email", // Missing "@" and "."
        phone: "+8801982897389",
        address: "123 Main St, Anytown, USA",
        gender: "male",
        occupation: "Engineer",
        education: "B.Sc. MIT 200",
        reasonForVisit:
          "I am passionate about space exploration and want to experience Mars firsthand.",
      },
    };

    const result = formSchema.safeParse(invalidEmailData);
    expect(result.success).toBe(false);
  });

  it("should fail for invalid date format", () => {
    const invalidDateData = {
      personalInformation: {
        fullName: "John Doe",
        dateOfBirth: "invalid-date", // Doesn't match YYYY-MM-DD format
        nationality: "American",
        email: "john.doe@example.com",
        phone: "+8801982897389",
        address: "123 Main St, Anytown, USA",
        gender: "male",
        occupation: "Engineer",
        education: "B.Sc. MIT 200",
        reasonForVisit:
          "I am passionate about space exploration and want to experience Mars firsthand.",
      },
    };

    const result = formSchema.safeParse(invalidDateData);
    expect(result.success).toBe(false);
    // Optionally, check for specific error messages related to date format
  });

  it("should fail validation if chronicIllnesses declaration is yes but medical conditions of chronicIllnesses is not provided", () => {
    const formData = {
      personalInformation: {
        fullName: "John Doe",
        dateOfBirth: "1990-01-01",
        nationality: "American",
        email: "john.doe@example.com",
        phone: "+8801982897389",
        address: "123 Main St, Anytown, USA",
        gender: "male",
        occupation: "Engineer",
        education: "B.Sc. year 2012",

        reasonForVisit:
          "I am passionate about space exploration and want to experience Mars firsthand.",
      },
      travelPreferences: {
        departureDate: "2024-12-01",
        returnDate: "2025-01-01",
        accommodationPreference: "space hotel",
        specialRequests: "Vegetarian meals",
      },
      healthSafety: {
        chronicIllnesses: true,
        takingMedication: false,
        majorSurgeries: false,
        allergies: false,
        emergencyContact: {
          fullName: "Jane Doe",
          relation: "Sister",
          phone: "+8801982897389",
          email: "jane.doe@example.com",
          address: "456 Elm St, Anytown, USA",
        },
        medicalConditions: {},
      },
    };
    const result = formSchema.safeParse(formData);
    expect(result.success).toBe(false);
  });

  it("should fail validation if takingMedication declaration is yes but medical conditions of takingMedication is not provided", () => {
    const formData = {
      personalInformation: {
        fullName: "John Doe",
        dateOfBirth: "1990-01-01",
        nationality: "American",
        email: "john.doe@example.com",
        phone: "+8801982897389",
        address: "123 Main St, Anytown, USA",
        gender: "male",
        occupation: "Engineer",
        education: '[{ degree: "B.Sc.", institution: "MIT", year: 2012 }]',
        reasonForVisit:
          "I am passionate about space exploration and want to experience Mars firsthand.",
      },
      travelPreferences: {
        departureDate: "2024-12-01",
        returnDate: "2025-01-01",
        accommodationPreference: "space hotel",
        specialRequests: "Vegetarian meals",
      },
      healthSafety: {
        chronicIllnesses: false,
        takingMedication: true,
        majorSurgeries: false,
        allergies: false,
        emergencyContact: {
          fullName: "Jane Doe",
          relation: "Sister",
          phone: "+8801982897389",
          email: "jane.doe@example.com",
          address: "456 Elm St, Anytown, USA",
        },
        medicalConditions: {},
      },
    };

    const result = formSchema.safeParse(formData);
    expect(result.success).toBe(false);
  });

  it("should validate validation if takingMedication declaration is yes and medical conditions of takingMedication is provided", () => {
    const formData = {
      personalInformation: {
        fullName: "John Doe",
        dateOfBirth: "1990-01-01",
        nationality: "American",
        email: "john.doe@example.com",
        phone: "+8801982897389",
        address: "123 Main St, Anytown, USA",
        gender: "male",
        occupation: "Engineer",
        education: '[{ degree: "B.Sc.", institution: "MIT", year: 2012 }]',
        reasonForVisit:
          "I am passionate about space exploration and want to experience Mars firsthand.",
      },
      travelPreferences: {
        departureDate: "2024-12-01",
        returnDate: "2025-01-01",
        accommodationPreference: "space hotel",
        specialRequests: "Vegetarian meals",
      },
      healthSafety: {
        chronicIllnesses: false,
        takingMedication: true,
        majorSurgeries: false,
        allergies: false,
        emergencyContact: {
          fullName: "Jane Doe",
          relation: "Sister",
          phone: "+8801982897389",
          email: "jane.doe@example.com",
          address: "456 Elm St, Anytown, USA",
        },
        medicalConditions: {
          takingMedication: "Inhaler",
        },
      },
    };

    const result = formSchema.safeParse(formData);
    expect(result.success).toBe(true);
  });
});
