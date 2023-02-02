export const Frontmatter = () => {
  return (
    <>
      <article>
        <p>
          Attempt to find missing persons by matching them to the unidentified
          remains.
        </p>

        <p>
          Filter the list of unidentified remains by clicking on the red
          buttons.
        </p>
      </article>

      <article>
        <p>Found a match? Reach out to the authorities.</p>

        <p>Don&apos;t call 911 if it&apos;s not an emergency!</p>

        <a href="https://www.rcmp-grc.gc.ca/cont/comment-eng.htm">
          RCMP Contact Form
        </a>

        <p>This project is not affiliated with the RCMP.</p>
      </article>

      {/* TODO use actual timestamp data */}
      <span>Data Last Updated: 2021-09-01</span>
    </>
  );
};
