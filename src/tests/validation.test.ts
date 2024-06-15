import { formSchema } from "../Schemas/form.schema";

describe("Form Validation Schema", () => {
  it("should validate correct form data successfully", () => {
    const formData = {
      personalInformation: {
        image: "http://example.com/image.jpg",
        fullName: "John Doe",
        dateOfBirth: "1990-01-01",
        nationality: "American",
        email: "john.doe@example.com",
        phone: "+8801982897389",
        address: "123 Main St, Anytown, USA",
        gender: "Male",
        occupation: "Engineer",
        education: [{ degree: "B.Sc.", institution: "MIT", year: 2012 }],
        socialMediaProfiles: [
          {
            platformName: "Twitter",
            profileLink: "http://example.com/profile",
          },
        ],
        reasonForVisit:
          "I am passionate about space exploration and want to experience Mars firsthand.",
      },
      travelPreferences: {
        departureDate: "2024-12-01",
        returnDate: "2025-01-01",
        accommodationPreference: "Space Hotel",
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

    const result = formSchema.safeParse(formData);
    expect(result.success).toBe(true);
  });

  it("should fail validation for incorrect phone number format", () => {
    const formData = {
      personalInformation: {
        image: "http://example.com/image.jpg",
        fullName: "John Doe",
        dateOfBirth: "1990-01-01",
        nationality: "American",
        email: "john.doe@example.com",
        phone: "123456", // Invalid phone number
        address: "123 Main St, Anytown, USA",
        gender: "Male",
        occupation: "Engineer",
        education: [{ degree: "B.Sc.", institution: "MIT", year: 2012 }],
        socialMediaProfiles: [
          {
            platformName: "Twitter",
            profileLink: "http://example.com/profile",
          },
        ],
        reasonForVisit:
          "I am passionate about space exploration and want to experience Mars firsthand.",
      },
      travelPreferences: {
        departureDate: "2024-12-01",
        returnDate: "2025-01-01",
        accommodationPreference: "Space Hotel",
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

    const result = formSchema.safeParse(formData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "Invalid phone number format"
      );
    }
  });

  it("should fail validation for incorrect emergency phone number format", () => {
    const formData = {
      personalInformation: {
        image: "http://example.com/image.jpg",
        fullName: "John Doe",
        dateOfBirth: "1990-01-01",
        nationality: "American",
        email: "john.doe@example.com",
        phone: "+8801982897389", // Invalid phone number
        address: "123 Main St, Anytown, USA",
        gender: "Male",
        occupation: "Engineer",
        education: [{ degree: "B.Sc.", institution: "MIT", year: 2012 }],
        socialMediaProfiles: [
          {
            platformName: "Twitter",
            profileLink: "http://example.com/profile",
          },
        ],
        reasonForVisit:
          "I am passionate about space exploration and want to experience Mars firsthand.",
      },
      travelPreferences: {
        departureDate: "2024-12-01",
        returnDate: "2025-01-01",
        accommodationPreference: "Space Hotel",
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
          phone: "297389",
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

    const result = formSchema.safeParse(formData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "Invalid phone number format"
      );
    }
  });

  it("should fail validation if chronicIllnesses declaration is yes but medical conditions of chronicIllnesses is not provided", () => {
    const formData = {
      personalInformation: {
        image: "http://example.com/image.jpg",
        fullName: "John Doe",
        dateOfBirth: "1990-01-01",
        nationality: "American",
        email: "john.doe@example.com",
        phone: "+8801982897389",
        address: "123 Main St, Anytown, USA",
        gender: "Male",
        occupation: "Engineer",
        education: [{ degree: "B.Sc.", institution: "MIT", year: 2012 }],
        socialMediaProfiles: [
          {
            platformName: "Twitter",
            profileLink: "http://example.com/profile",
          },
        ],
        reasonForVisit:
          "I am passionate about space exploration and want to experience Mars firsthand.",
      },
      travelPreferences: {
        departureDate: "2024-12-01",
        returnDate: "2025-01-01",
        accommodationPreference: "Space Hotel",
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
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "Medical conditions must be provided if declaration is Yes"
      );
    }
  });

  it("should fail validation if takingMedication declaration is yes but medical conditions of takingMedication is not provided", () => {
    const formData = {
      personalInformation: {
        image: "http://example.com/image.jpg",
        fullName: "John Doe",
        dateOfBirth: "1990-01-01",
        nationality: "American",
        email: "john.doe@example.com",
        phone: "+8801982897389",
        address: "123 Main St, Anytown, USA",
        gender: "Male",
        occupation: "Engineer",
        education: [{ degree: "B.Sc.", institution: "MIT", year: 2012 }],
        socialMediaProfiles: [
          {
            platformName: "Twitter",
            profileLink: "http://example.com/profile",
          },
        ],
        reasonForVisit:
          "I am passionate about space exploration and want to experience Mars firsthand.",
      },
      travelPreferences: {
        departureDate: "2024-12-01",
        returnDate: "2025-01-01",
        accommodationPreference: "Space Hotel",
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
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "Medical conditions must be provided if declaration is Yes"
      );
    }
  });

  it("should validate validation if takingMedication declaration is yes and medical conditions of takingMedication is provided", () => {
    const formData = {
      personalInformation: {
        image: "http://example.com/image.jpg",
        fullName: "John Doe",
        dateOfBirth: "1990-01-01",
        nationality: "American",
        email: "john.doe@example.com",
        phone: "+8801982897389",
        address: "123 Main St, Anytown, USA",
        gender: "Male",
        occupation: "Engineer",
        education: [{ degree: "B.Sc.", institution: "MIT", year: 2012 }],
        socialMediaProfiles: [
          {
            platformName: "Twitter",
            profileLink: "http://example.com/profile",
          },
        ],
        reasonForVisit:
          "I am passionate about space exploration and want to experience Mars firsthand.",
      },
      travelPreferences: {
        departureDate: "2024-12-01",
        returnDate: "2025-01-01",
        accommodationPreference: "Space Hotel",
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
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "Medical conditions must be provided if declaration is Yes"
      );
    }
  });
});
