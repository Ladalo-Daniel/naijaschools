export const admin_lesson_urls = (courseId?: string | number, lessonId?: string | number) => {
    if (!courseId && !lessonId)
        return `/dashboard/admin/lesson`
    if (!lessonId)
        return `/dashboard/admin/courses/${courseId}`
    if (courseId && lessonId)
        return `/dashboard/admin/courses/${courseId}/lesson/${lessonId}`

    else return '/dashboard/admin'
}