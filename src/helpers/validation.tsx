import { useMemo, useState } from "react";

export type ContactFormState = {
  name: string;
  email: string;
  message: string;
};

const initialState: ContactFormState = {
  name: "",
  email: "",
  message: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useContactForm() {
  const [values, setValues] = useState<ContactFormState>(initialState);
  const [touched, setTouched] = useState<
    Partial<Record<keyof ContactFormState, boolean>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof ContactFormState, string>> = {};

    if (!values.name.trim()) {
      e.name = "Введите имя";
    }

    if (!values.email.trim()) {
      e.email = "Введите email";
    } else if (!emailRegex.test(values.email)) {
      e.email = "Некорректный email";
    }

    if (!values.message.trim()) {
      e.message = "Напишите сообщение";
    }

    return e;
  }, [values]);

  const isValid = Object.keys(errors).length === 0;

  function setField<K extends keyof ContactFormState>(
    field: K,
    value: ContactFormState[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function touchAll() {
    setTouched({
      name: true,
      email: true,
      message: true,
    });
  }

  function reset() {
    setValues(initialState);
    setTouched({});
  }

  function submit(onSuccess?: () => void) {
    touchAll();

    if (!isValid) return;

    // здесь будет реальная отправка (API / Formspree / etc)
    setSubmitted(true);
    reset();
    onSuccess?.();
  }

  return {
    values,
    errors,
    touched,
    isValid,
    submitted,

    setField,
    setTouched,
    submit,
  };
}
