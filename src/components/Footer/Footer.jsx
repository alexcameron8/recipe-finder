import { Divider, Spinner, Skeleton } from "@nextui-org/react";

export function Footer() {
  return (
    <div className="flex justify-center">
      <footer className="w-full justify-center bg-gray-100 py-4 text-sm">
        <p className=" flex items-center justify-center ">
          Designed & developed by Alex Cameron © 2024. Powered by{"\u00A0"}
          <a
            className="underline"
            href="https://developer.edamam.com/edamam-docs-recipe-api"
          >
            Edamam API
          </a>
          . This site is for not for profit purposes.
        </p>
      </footer>
    </div>
  );
}
