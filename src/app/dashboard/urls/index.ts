export const learn_urls = (courseId?: string | number, lessonId?: string | number) => {
    if (!courseId && !lessonId)
        return `/dashboard/learn`
    if (!lessonId)
        return `/dashboard/learn/courses/${courseId}`
    if (courseId && lessonId)
        return `/dashboard/learn/courses/${courseId}/lesson/${lessonId}`

    else return '/dashboard'
}
