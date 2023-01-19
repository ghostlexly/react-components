/** @author Tolga Malkoc <ghostlexly@gmail.com> */

import PhoneInput, { CountryData } from "react-phone-input-2";
import cn from "classnames";
import { useField, useFormikContext } from "formik";
import React, { useEffect, useId, useState } from "react";
import { parsePhoneNumber, CountryCode } from "libphonenumber-js";
import ct from "countries-and-timezones";
import { find } from "lodash";

// install required package: yarn add react-phone-input-2
// add into globals.css : @import "react-phone-input-2/lib/material.css";
interface Props {
  name: string;
  country: string;
  onlyCountries: string[];
  specialLabel: string;
  className: string;
  containerClassName: string;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  guessCountryByTimeZone?: boolean;
}

const GhostPhoneNumber: React.FunctionComponent<Props> = ({
  name,
  country, // "fr"
  onlyCountries, // {["fr", "re"]}
  specialLabel,
  className,
  containerClassName,
  onKeyDown,
  guessCountryByTimeZone = true,
}) => {
  const formik = useFormikContext();
  const [field, meta] = useField(name);
  const [definedCountry, setDefinedCountry] = useState(country);
  let uniqueId = useId();

  // determinate user's country from his timezone
  useEffect(() => {
    if (guessCountryByTimeZone) {
      let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const resolvedTz = ct.getTimezone(tz);
      const country = resolvedTz?.countries[0].toLowerCase();

      if (onlyCountries) {
        if (
          find(onlyCountries, function (o) {
            return o === country;
          })
        ) {
          setDefinedCountry(country);
        }
      } else {
        setDefinedCountry(country);
      }
    }
  }, []);

  return (
    <>
      <div className={containerClassName}>
        <PhoneInput
          {...field}
          inputProps={{ id: uniqueId }}
          onChange={(value, country: CountryData, e, formattedValue) => {
            try {
              // use libphonenumber-js to fix the leading zeros and errors in the phone numbers. This is the best tool for phone number inputs, you can even use it instead of a specific phone input lib.
              let libPhoneValue = parsePhoneNumber(formattedValue, country.countryCode.toUpperCase() as CountryCode);
              value = libPhoneValue.countryCallingCode + libPhoneValue.nationalNumber;

              // check valid phone number
              if (libPhoneValue.isValid()) {
                formik.setFieldError(field.name, null);
              } else {
                formik.setFieldError(field.name, "Veuillez saisir un numéro de téléphone valide.");
              }
            } catch (err) {
              console.log("lib error: " + err);
            }

            // fire event for Formik to inform it of the new number
            formik.setFieldValue(field.name, value, false);
          }}
          enableLongNumbers={true}
          onKeyDown={onKeyDown}
          country={definedCountry}
          onlyCountries={onlyCountries}
          specialLabel={specialLabel}
          inputClass={cn([
            `w-full`,
            className,
            meta.error
              ? "border-red-600 focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              : "",
          ])}
        />
        {meta.error && <p className={"text-red-600 whitespace-pre-wrap"}>{meta.error}</p>}
      </div>
    </>
  );
};

export default GhostPhoneNumber;
