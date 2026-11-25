import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { WaitlistOnboardingForm } from "./forms/WaitlistOnboardingForm";
import { CloseIcon } from "./icons";
import { useWaitlistModalListener } from "../lib/waitlist";

export function WaitlistModal() {
  const [isOpen, setIsOpen] = useState(false);

  useWaitlistModalListener(() => setIsOpen(true));

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[150]" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl max-h-[92vh] overflow-y-auto transform rounded-3xl bg-white text-left align-middle shadow-2xl transition-all dark:bg-[#100E20] dark:border dark:border-white/10">
                <div className="relative p-6 sm:p-8">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="absolute right-5 top-5 z-10 rounded-full p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-white/10 dark:hover:text-white"
                    aria-label="Close waitlist modal"
                  >
                    <CloseIcon size={20} />
                  </button>
                  <WaitlistOnboardingForm compact onSuccess={() => {}} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
