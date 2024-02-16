export const query_string = (school?: string, faculty?: string, course?: string ) => {

    let query_string = `?school=${school}&faculty=${faculty}&course=${course}`

    if (!(school && course && faculty))
      query_string = ''

    if (!school)
      query_string = `?faculty=${faculty}&course=${course}`

    if (!faculty)
      query_string = `?school=${school}&course=${course}`

    if (!course)
      query_string = `?school=${school}&faculty=${faculty}`

    if (!school && !faculty)
      query_string = `?course=${course}`

    if (!school && !course)
      query_string = `?faculty=${faculty}`

    if (!course && !faculty)
      query_string = `?school=${school}`

    return query_string
}
