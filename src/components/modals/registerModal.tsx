import React, { useState, useEffect } from "react";

import Link from "next/link";
import Router from "next/router";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AppInput } from "@components/ui/shared/AppInput";
import { buttonVariants } from "@components/ui/shared/AppButton";

import { authService } from "@services/auth.service";
import { cookieService } from "@services/cookies.service";

import {
  registerFan,
  loginSocial,
  registerFanSuccess,
  verifiedFanSuccess,
} from "@redux/auth/actions";

import { connect, useDispatch } from "react-redux";
import { updateModals } from "@redux/modals/actions";

import { ISettings, IUIConfig } from "src/interfaces";
import { IPerformer } from "@interfaces/performer";

import { auth, provider, signInWithPopup } from "@lib/firebase";

import useClickOutside from "src/hooks/useClickOutside";
import useDisableScroll from "src/hooks/useDisabledScroll";
import GenderInput from "@components/ui/shared/GenderInput";
import CheckboxInput from "@components/ui/shared/CheckboxInput";

interface ModalProps {
  settings: ISettings;
  isOpen: boolean;
  onClose: () => void;
  registerFanData: any;
  loginSocial: Function;
}

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.{8,})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[^\w\d]).*$/,
      "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character."
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  gender: yup
    .string()

    .required("‘Please select any one option."),
  ageConfirmation: yup
    .bool()
    .oneOf([true], "’Please agree to the terms and conditions to proceed."),
});

const RegisterModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  loginSocial,
  registerFanData,
  settings,
}) => {
  const dispatch = useDispatch();

  const [introducerId, setIntroducerId] = useState<any>(null);
  const {
    register,
    handleSubmit,
    formState: { isLoading, isValid, errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  useDisableScroll(isOpen);
  const onSubmit = (data) => {
    try {
      const resp = cookieService.getCookie("introducerId") || null;
      dispatch(registerFan({ ...data, introducerId: resp || null }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getIntroducer();
  }, []);

  async function getIntroducer() {
    const data = (await cookieService.getCookie("introducerId")) || null;

    setIntroducerId(data);
  }

  async function onGoogleLogin(resp: any) {
    const payload = { tokenId: resp.tokenId, role: "user" };

    if (!resp?.tokenId) {
      return;
    }

    console.log(resp, "resp");

    try {
      // await this.setState({ isLoading: true });
      const response = await (await authService.loginGoogle(payload)).data;
      response.token && loginSocial({ token: response.token });
    } catch (e) {
      const error = await e;
      // message.error(error && error.message ? error.message : 'Google login authenticated fail');
    } finally {
      // this.setState({ isLoading: false });
    }
  }

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const payload = { tokenId: token, role: "user" };

      const response = await (await authService.loginGoogle(payload)).data;
      response.token && loginSocial({ token: response.token });
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  useEffect(() => {
    if (registerFanData.success && registerFanData?.data?.user) {
      Router.push("/help/about-caster/confirmemail");
    }
  }, [registerFanData]);

  useDisableScroll(isOpen);
  const ref = useClickOutside(onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        tabIndex={-1}
        aria-hidden="true"
        className={`overflow-y-auto px-6 overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div
          ref={ref}
          role="dialog"
          className="relative w-full max-w-[485px] max-h-full m-auto"
        >
          <div className="relative px-6 pt-6 bg-white rounded-lg shadow pb-9">
            <div className="flex items-center justify-end rounded-t">
              <button
                onClick={onClose}
                type="button"
                className="absolute inline-flex items-center justify-center w-6 h-6 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 top-4 right-4"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 text-xl text-center text-black">
                Create your account
              </h3>

              <h4 className="mb-6 text-sm text-center text-base-600">
                Make your own videos and more.
              </h4>

              <div className="space-y-6">
                <form
                  className="space-y-3"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  <AppInput
                    {...register("email")}
                    type="email"
                    id="register-email"
                    autoComplete="username"
                    placeholder="Email"
                    errorMessage={errors?.email?.message}
                  />
                  <AppInput
                    {...register("password")}
                    type="password"
                    id="register-password"
                    autoComplete="new-password"
                    placeholder="Password"
                    errorMessage={errors?.password?.message}
                  />
                  <AppInput
                    {...register("confirmPassword")}
                    type="password"
                    id="register-confirm-password"
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    errorMessage={errors?.confirmPassword?.message}
                  />
                  <GenderInput
                    label="Gender"
                    name="gender"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                    register={register}
                    errorMessage={errors?.gender?.message}
                  />
                  <CheckboxInput
                    label="I confirm that I am at least 18 years old."
                    name="ageConfirmation"
                    register={register}
                    errorMessage={errors?.ageConfirmation?.message}
                  />
                  <button
                    type="submit"
                    className={`w-full ${buttonVariants({
                      disabled: !isValid || isLoading,
                    })}`}
                  >
                    {registerFanData?.requesting ? (
                      <div className="inline-flex items-center gap-2">
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>

                        <span>Loading...</span>
                      </div>
                    ) : (
                      "Create account"
                    )}
                  </button>
                </form>
              </div>

              <div className="inline-flex items-center justify-center w-full my-4">
                <hr className="w-full h-px bg-gray-200 border-0" />
                <span className="absolute px-3 bg-white text-base-700">Or</span>
              </div>

              <div className="mb-6 space-y-3">
                <button
                  type="submit"
                  onClick={() => handleSignInWithGoogle()}
                  className="flex items-center justify-center w-full h-12 gap-3 px-8 py-3 font-semibold text-black rounded-full bg-base-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.64 12.2061C20.64 11.568 20.5827 10.9543 20.4764 10.3652H12V13.8466H16.8436C16.635 14.9716 16.0009 15.9248 15.0477 16.563V18.8211H17.9564C19.6582 17.2543 20.64 14.9471 20.64 12.2061Z"
                      fill="#4285F4"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.0001 21.0009C14.4301 21.0009 16.4674 20.195 17.9565 18.8205L15.0479 16.5623C14.2419 17.1023 13.211 17.4214 12.0001 17.4214C9.65603 17.4214 7.67194 15.8382 6.96422 13.7109H3.9574V16.0428C5.43831 18.9841 8.48194 21.0009 12.0001 21.0009Z"
                      fill="#34A853"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.96409 13.7108C6.78409 13.1708 6.68182 12.594 6.68182 12.0008C6.68182 11.4076 6.78409 10.8308 6.96409 10.2908V7.95898H3.95727C3.34773 9.17398 3 10.5485 3 12.0008C3 13.4531 3.34773 14.8276 3.95727 16.0426L6.96409 13.7108Z"
                      fill="#FBBC05"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.0001 6.57955C13.3215 6.57955 14.5079 7.03364 15.4406 7.92545L18.0219 5.34409C16.4633 3.89182 14.426 3 12.0001 3C8.48194 3 5.43831 5.01682 3.9574 7.95818L6.96422 10.29C7.67194 8.16273 9.65603 6.57955 12.0001 6.57955Z"
                      fill="#EA4335"
                    />
                  </svg>

                  <span>Continue with Google</span>
                </button>

                <button
                  onClick={onClose}
                  className="flex items-center justify-center w-full h-12 gap-3 px-8 py-3 font-semibold text-black rounded-full bg-base-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <mask
                      id="mask0_2916_39220"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="21"
                      height="20"
                    >
                      <rect x="0.5" width="20" height="20" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_2916_39220)">
                      <path
                        d="M5.02308 15.7923C5.87308 15.1615 6.79903 14.6635 7.80095 14.2981C8.80287 13.9327 9.86921 13.75 11 13.75C12.1307 13.75 13.1971 13.9327 14.199 14.2981C15.2009 14.6635 16.1269 15.1615 16.9769 15.7923C17.5987 15.109 18.0913 14.3179 18.4548 13.4192C18.8182 12.5205 19 11.5474 19 10.5C19 8.28331 18.2208 6.39581 16.6625 4.83748C15.1041 3.27914 13.2166 2.49998 11 2.49998C8.78331 2.49998 6.89581 3.27914 5.33748 4.83748C3.77914 6.39581 2.99998 8.28331 2.99998 10.5C2.99998 11.5474 3.18171 12.5205 3.54518 13.4192C3.90864 14.3179 4.40128 15.109 5.02308 15.7923ZM11.0003 11.25C10.0873 11.25 9.31729 10.9366 8.69038 10.3099C8.06346 9.68314 7.75 8.91328 7.75 8.00028C7.75 7.08726 8.06336 6.31729 8.69008 5.69038C9.31681 5.06346 10.0867 4.75 10.9997 4.75C11.9127 4.75 12.6827 5.06336 13.3096 5.69008C13.9365 6.31681 14.25 7.08668 14.25 7.99968C14.25 8.91269 13.9366 9.68266 13.3099 10.3096C12.6831 10.9365 11.9133 11.25 11.0003 11.25ZM11 20C9.68074 20 8.44325 19.7519 7.2875 19.2557C6.13173 18.7596 5.12628 18.0839 4.27115 17.2288C3.41603 16.3737 2.7404 15.3682 2.24425 14.2125C1.74808 13.0567 1.5 11.8192 1.5 10.5C1.5 9.18074 1.74808 7.94325 2.24425 6.7875C2.7404 5.63173 3.41603 4.62628 4.27115 3.77115C5.12628 2.91603 6.13173 2.2404 7.2875 1.74425C8.44325 1.24808 9.68074 1 11 1C12.3192 1 13.5567 1.24808 14.7125 1.74425C15.8682 2.2404 16.8737 2.91603 17.7288 3.77115C18.5839 4.62628 19.2596 5.63173 19.7557 6.7875C20.2519 7.94325 20.5 9.18074 20.5 10.5C20.5 11.8192 20.2519 13.0567 19.7557 14.2125C19.2596 15.3682 18.5839 16.3737 17.7288 17.2288C16.8737 18.0839 15.8682 18.7596 14.7125 19.2557C13.5567 19.7519 12.3192 20 11 20ZM11 18.5C11.9025 18.5 12.7727 18.3548 13.6105 18.0644C14.4484 17.774 15.1923 17.3679 15.8423 16.8461C15.1923 16.3436 14.458 15.9519 13.6394 15.6711C12.8208 15.3903 11.941 15.25 11 15.25C10.0589 15.25 9.17753 15.3887 8.35573 15.6663C7.53393 15.9439 6.80123 16.3371 6.15765 16.8461C6.80765 17.3679 7.55157 17.774 8.3894 18.0644C9.22722 18.3548 10.0974 18.5 11 18.5ZM11 9.75C11.4974 9.75 11.9134 9.58269 12.2481 9.24808C12.5827 8.91344 12.75 8.49741 12.75 7.99998C12.75 7.50254 12.5827 7.08651 12.2481 6.75188C11.9134 6.41726 11.4974 6.24995 11 6.24995C10.5025 6.24995 10.0865 6.41726 9.75187 6.75188C9.41726 7.08651 9.24995 7.50254 9.24995 7.99998C9.24995 8.49741 9.41726 8.91344 9.75187 9.24808C10.0865 9.58269 10.5025 9.75 11 9.75Z"
                        fill="#121212"
                      />
                    </g>
                  </svg>

                  <span>Continue as Guest</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() =>
                  dispatch(
                    updateModals({
                      isLoginModalOpen: true,
                      isRegisterModalOpen: false,
                    })
                  )
                }
                className="flex mx-auto text-sm font-medium text-black cursor-pointer mb-9 hover:underline"
              >
                Already have an account?&nbsp;
                <span className="text-purple-800">Log in</span>
              </button>

              <div className="max-w-xs mx-auto">
                <p className="text-xs text-center text-base-600">
                  By continuing, you agree to our
                  <Link href="/page/terms-of-service" passHref>
                    <a className="px-1 font-medium text-center text-purple-800 hover:underline">
                      Terms of Service
                    </a>
                  </Link>
                  and acknowledge that you have read our privacy policy to learn
                  how we collect and share data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-30 ${
          isOpen ? "block" : "hidden"
        }`}
      />
    </>
  );
};

const mapState = (state) => ({
  modals: { ...state.modals },
  settings: { ...state.settings },
  registerFanData: { ...state.auth.registerFanData },
  verified: state.auth.verified,
});

const mapDispatch = {
  updateModals,
  registerFan,
  loginSocial,
  registerFanSuccess,
  verifiedFanSuccess,
};

export default connect(mapState, mapDispatch)(RegisterModal);
