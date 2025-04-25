import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { usStates } from "../../constants/usStates";

const FormSection = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .form-error {
    color: #a00;
    background: #fee;
    padding: 8px;
    border: 1px solid #a00;
    border-radius: 4px;
    margin-bottom: 12px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input,
    select {
      padding: 10px;
      font-size: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }

    .error-message {
      color: red;
      font-size: 0.9rem;
    }

    .button-group {
      display: flex;
      justify-content: flex-end;
      gap: 15px;
      margin-top: 20px;

      button {
        padding: 10px 20px;
        font-size: 1rem;
        border: none;
        cursor: pointer;
        border-radius: 4px;
      }

      .save {
        background-color: #000;
        color: #fff;

        &:hover {
          background-color: #333;
        }
      }

      .cancel {
        background-color: #ddd;
        color: #000;

        &:hover {
          background-color: #bbb;
        }
      }
    }
  }
`;

const addressSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[A-Za-z\s'-]+$/, "Only letters, spaces, apostrophes, or hyphens")
    .min(2, "Minimum 2 characters")
    .required("First name required"),
  last_name: Yup.string()
    .matches(/^[A-Za-z\s'-]+$/, "Only letters, spaces, apostrophes, or hyphens")
    .min(2, "Minimum 2 characters")
    .required("Last name required"),
  street: Yup.string()
    .min(5, "Street address is too short")
    .required("Street required"),
  city: Yup.string().min(2, "City name is too short").required("City required"),
  state: Yup.string()
    .oneOf(usStates, "Select a valid state")
    .required("State required"),
  zip: Yup.string()
    .matches(/^\d{5}(-\d{4})?$/, "Enter a valid US ZIP code")
    .required("ZIP code required"),
  isDefault: Yup.boolean(),
});

const AddressForm = ({ initialValues, onSave, onCancel, errorMessage }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: initialValues || {
      first_name: "",
      last_name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false,
    },
  });

  const onSubmit = (data) => {
    onSave(data);
    reset();
  };

  return (
    <FormSection>
      {errorMessage && <div className="form-error">{errorMessage}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="First Name"
          {...register("first_name")}
        />
        {errors.first_name && (
          <span className="error-message">{errors.first_name.message}</span>
        )}

        <input type="text" placeholder="Last Name" {...register("last_name")} />
        {errors.last_name && (
          <span className="error-message">{errors.last_name.message}</span>
        )}

        <input
          type="text"
          placeholder="Street Address"
          {...register("street")}
        />
        {errors.street && (
          <span className="error-message">{errors.street.message}</span>
        )}

        <input type="text" placeholder="City" {...register("city")} />
        {errors.city && (
          <span className="error-message">{errors.city.message}</span>
        )}

        <select {...register("state")}>
          <option value="">Select State</option>
          {usStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors.state && (
          <span className="error-message">{errors.state.message}</span>
        )}

        <input type="text" placeholder="ZIP Code" {...register("zip")} />
        {errors.zip && (
          <span className="error-message">{errors.zip.message}</span>
        )}

        {/* <label>
          <input type="checkbox" {...register("isDefault")} /> Set as default
          address
        </label> */}

        <div className="button-group">
          <button type="submit" className="save">
            Save
          </button>
          <button type="button" className="cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </FormSection>
  );
};

export default AddressForm;
