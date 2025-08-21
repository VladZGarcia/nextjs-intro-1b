import MainWrapper from "@/components/main-wrapper";

export default function AboutPage() {
  return (
    <MainWrapper title="About us">
      <h2 className="font-serif">This is about us and our history</h2>
      <a
        href="https://nextjs.org/docs"
        target="_blank"
        rel="noopener noreferrer"
      >
        Next
      </a>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dicta
        culpa veniam iusto voluptate laboriosam itaque, ullam, exercitationem
        magni sed quidem nihil aliquam fuga. Voluptatem exercitationem
        consectetur laboriosam neque est?
      </p>
    </MainWrapper>
  );
}
