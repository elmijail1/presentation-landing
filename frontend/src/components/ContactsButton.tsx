import { useState } from "react";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { ToastCopyFailure, ToastCopySuccess } from "./Toasts";
import {
  EMAIL_ADDRESS,
  URL_GITHUB,
  URL_LINKEDIN,
} from "../data/publicContacts";

export function ContactsButton() {
  const [contactsOpen, setContactsOpen] = useState(false);
  const { justCopied, copyFailed, copy } = useCopyToClipboard();

  return (
    <>
      <div className="fixed bottom-4 right-4 text-2xl z-50">
        <button
          type="button"
          onClick={() => setContactsOpen((prev) => !prev)}
          className="text-2xl bg-linear-to-r from-orange-400 to-orange-500 text-white p-3 rounded-2xl cursor-pointer hover:brightness-90 z-20"
        >
          Contacts
        </button>
        <ul
          className={`absolute -top-34 right-0 bg-linear-to-r from-orange-400 to-orange-500 text-white p-3 rounded-2xl cursor-pointer text-center transition-all duration-500 z-10 flex flex-col gap-1 ${contactsOpen ? "opacity-100" : "opacity-0 translate-y-5"}`}
        >
          <li className="hover:underline underline-offset-2">
            <a
              href={URL_LINKEDIN}
              target="_blank"
              onClick={() => setContactsOpen(false)}
            >
              LinkedIn
            </a>
          </li>
          <li className="underline-offset-2">
            <button
              type="button"
              className="hover:underline cursor-pointer"
              onClick={() => {
                copy(EMAIL_ADDRESS);
                setContactsOpen(false);
              }}
            >
              Email
            </button>
          </li>
          <li className="hover:underline underline-offset-2">
            <a
              href={URL_GITHUB}
              target="_blank"
              onClick={() => setContactsOpen(false)}
            >
              GitHub
            </a>
          </li>
          <button
            type="button"
            onClick={() => setContactsOpen(false)}
            className="absolute -top-8 right-0 px-2 rounded-2xl font-normal text-lg bg-orange-500 flex justify-center items-center cursor-pointer hover:brightness-90"
          >
            <span className="rotate-45">✚</span>
          </button>
        </ul>
      </div>
      {justCopied && <ToastCopySuccess />}
      {copyFailed && <ToastCopyFailure />}
    </>
  );
}
