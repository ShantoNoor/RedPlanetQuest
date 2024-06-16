import mongoose, { Schema, Document, Model } from "mongoose";

interface EmergencyContact {
  fullName: string;
  relation: string;
  phone: string;
  email: string;
  address: string;
}

interface MedicalConditions {
  chronicIllnesses?: string;
  medications?: string;
  majorSurgeries?: string;
  allergies?: string;
}

interface HealthSafety extends Document {
  chronicIllnesses: boolean;
  takingMedication: boolean;
  majorSurgeries: boolean;
  allergies: boolean;
  emergencyContact: EmergencyContact;
  medicalConditions?: MedicalConditions;
}

interface TravelPreferences extends Document {
  departureDate: Date;
  returnDate: Date;
  accommodationPreference: "space hotel" | "martian base";
  specialRequests?: string;
}

interface PersonalInformation extends Document {
  fullName: string;
  dateOfBirth: Date;
  nationality: string;
  email: string;
  phone: string;
  address: string;
  gender: "male" | "female";
  occupation: string;
  education: string;
  reasonForVisit: string;
}

interface Form extends Document {
  personalInformation: PersonalInformation;
  travelPreferences: TravelPreferences;
  healthSafety: HealthSafety;
}

const EmergencyContactSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  relation: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
});

const MedicalConditionsSchema: Schema = new Schema({
  chronicIllnesses: { type: String },
  medications: { type: String },
  majorSurgeries: { type: String },
  allergies: { type: String },
});

const HealthSafetySchema: Schema = new Schema({
  chronicIllnesses: { type: Boolean, required: true },
  takingMedication: { type: Boolean, required: true },
  majorSurgeries: { type: Boolean, required: true },
  allergies: { type: Boolean, required: true },
  emergencyContact: { type: EmergencyContactSchema, required: true },
  medicalConditions: { type: MedicalConditionsSchema },
});

const TravelPreferencesSchema: Schema = new Schema({
  departureDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  accommodationPreference: {
    type: String,
    enum: ["space hotel", "martian base"],
    required: true,
  },
  specialRequests: { type: String },
});

const PersonalInformationSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  nationality: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  occupation: { type: String, required: true },
  education: { type: String, required: true },
  reasonForVisit: { type: String, required: true },
});

const FormSchema: Schema = new Schema({
  personalInformation: { type: PersonalInformationSchema, required: true },
  travelPreferences: { type: TravelPreferencesSchema, required: true },
  healthSafety: { type: HealthSafetySchema, required: true },
});

const FormModel: Model<Form> = mongoose.models.form || mongoose.model<Form>("form", FormSchema);
export default FormModel;
