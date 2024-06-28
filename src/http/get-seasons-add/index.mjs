import arc from '@architect/functions'
import { getSeason } from '@architect/shared/db/seasons.mjs'
import render from '@architect/views/render.mjs'
import authenticate from '@architect/shared/auth.mjs'


const initialSeason = {
  seasonID: '',
  name: '',
  startDate: '',
  endDate: '',
  cost: ''
}

export const handler = arc.http.async(authenticate, players)

async function players(req) {
  const initialState = { account: req.session?.account }
  const { id = null } = req.query
  const season = id ? await getSeason(id) : initialSeason

  return {
    html: render(
      `
    <hockey-page>
      <hockey-form action="/seasons">
        <input name="seasonID" type="hidden" value="${season.seasonID}"/>
        <hockey-input id="name" label="Name" type="text" required="true" value="${season.name}"></hockey-input>
        <hockey-input id="startDate" label="Starting Date" type="date" required="true" value="${season.startDate}"></hockey-input>
        <hockey-input id="endDate" label="Ending Date" type="date" required="true" value="${season.endDate}"></hockey-input>
        <hockey-input id="cost" label="Cost" type="number" required="true" value="${season.cost}"></hockey-input>
      </hockey-form>
    </hockey-page>
  `,
      initialState
    )
  }
}
