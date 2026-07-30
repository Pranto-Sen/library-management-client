import {
  useEffect,
} from "react";

import {
  useForm,
} from "react-hook-form";

import "../../pages/branches/Branches.css";

export default function BranchFormModal({
  branch,
  onClose,
  onSave,
}) {

  const {

    register,

    handleSubmit,

    reset,

    formState: {

      errors,

      isSubmitting,

    },

  } = useForm();

  useEffect(() => {

    if (branch) {

      reset({

        name: branch.name,

        address: branch.address,

      });

    }

    else {

      reset({

        name: "",

        address: "",

      });

    }

  }, [branch, reset]);

  return (

    <div className="modal-overlay">

      <div className="book-modal">

        <h2>

          {

            branch

              ? "Edit Branch"

              : "Add Branch"

          }

        </h2>

        <form
          onSubmit={handleSubmit(onSave)}
        >

          <div className="form-grid">

            <div className="form-group">

              <label>Name</label>

              <input

                {...register(

                  "name",

                  {

                    required:

                      "Name is required",

                  }

                )}

              />

              <span className="error">

                {errors.name?.message}

              </span>

            </div>

            <div className="form-group full-width">

              <label>Address</label>

              <textarea

                rows={4}

                {...register(

                  "address",

                  {

                    required:

                      "Address is required",

                  }

                )}

              />

              <span className="error">

                {errors.address?.message}

              </span>

            </div>

          </div>

          <div className="modal-footer">

            <button

              type="button"

              className="cancel-btn"

              onClick={onClose}

            >
              Cancel
            </button>

            <button

              className="save-btn"

              disabled={isSubmitting}

            >
              {

                branch

                  ? "Update"

                  : "Save"

              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}