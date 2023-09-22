import CardDetailsContainer from "../../_components/CardDetailsContainer"

export default function Loading() {
  return (
    <div className="grid content-start gap-4 pb-4">
      <section className="w-full h-16 p-2 rounded-b bg-hoverSecondary text-textPrimary fluid-base" />
      <section className="grid gap-5 py-5">
        <h1 className="font-extrabold fluid-xl text-textPrimary">Bookmarks</h1>

        <CardDetailsContainer label="Movies" locale="en" labelSize="fluid-xl">
          <div className="col-span-4 p-1 fluid-lg text-textPrimary h-[4ch] rounded bg-slate-700" />
        </CardDetailsContainer>
        <CardDetailsContainer label="Series" locale="en" labelSize="fluid-xl">
          <div className="col-span-4 p-1 fluid-lg text-textPrimary h-[4ch] rounded bg-slate-700" />
        </CardDetailsContainer>
        <CardDetailsContainer label="Books" locale="en" labelSize="fluid-xl">
          <div className="col-span-4 p-1 fluid-lg text-textPrimary h-[4ch] rounded bg-slate-700" />
        </CardDetailsContainer>
      </section>
    </div>
  )
}
