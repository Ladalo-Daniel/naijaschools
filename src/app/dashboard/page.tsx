import MainLayout from "@/components/MainLayout";
import MaxWrapper from "@/components/MaxWrapper";
import DashboardCards from "@/components/dashboard/DashboardCards";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "dashboard",
  description: "Dashboard | Welcome"
}

export default function Dashboard({ children }: { children: ReactNode}) {
  return (
      <>
      <MaxWrapper className="bg-background">
        <div className="leading-relaxed">
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis quia cupiditate accusamus ipsum consectetur incidunt saepe nam, ipsam libero molestiae corrupti perspiciatis reprehenderit magni maxime, laboriosam ullam dolores vero corporis?</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis explicabo laborum animi ea itaque dolor earum dolorum, numquam pariatur dolorem iste odio suscipit tempore rerum cumque! Quidem ipsum nemo accusamus, quis quas reprehenderit, consequuntur rem natus dolore ut beatae alias possimus quasi, voluptates culpa necessitatibus adipisci. Beatae hic facilis esse quisquam ea, id deserunt in minima natus animi assumenda, atque nesciunt eos expedita, ipsam quam. Error, nihil sapiente voluptates itaque eveniet doloribus vitae, iure dolore, fugiat corrupti quo minima ducimus velit nostrum maxime reprehenderit consectetur inventore nemo mollitia eius voluptas adipisci blanditiis. Tenetur esse sed ex possimus repellat voluptatum sequi, voluptates, dolorum eligendi quam suscipit magni qui temporibus voluptas velit nisi explicabo nemo quia, error sint. Accusantium adipisci quibusdam exercitationem, quas unde deleniti suscipit dolorum architecto tempore voluptates nulla, at sit officia nam nesciunt tenetur omnis fuga assumenda? Tenetur harum expedita inventore vel corrupti earum, deleniti quaerat reiciendis, atque veritatis at minus impedit ut, voluptatum rerum. Repellendus beatae perspiciatis quibusdam tempora reprehenderit vero qui asperiores praesentium sint distinctio sit corrupti illum, officiis, ullam fugit dolorem optio excepturi aspernatur minus magni facilis eveniet modi velit. Ullam ipsa quod tempora vel laborum libero fugiat soluta sed modi dolore quia, quo nobis enim. Molestiae obcaecati provident animi aut minus voluptates corrupti libero voluptate odit. Deleniti in veniam eligendi voluptas voluptatibus iste dolorem velit unde earum temporibus maxime, animi laboriosam provident at! Eos, vero, excepturi officia laboriosam, sequi facere velit odit delectus quae eius soluta eveniet dolorem inventore non adipisci facilis recusandae amet libero magni deleniti neque iste qui! Dolores eius ut labore iste illo libero repellat at ab magnam, consequuntur nam perspiciatis maxime deleniti ipsam, quia voluptatem beatae! Minima veniam asperiores mollitia dolorem beatae fuga vel molestias! Ipsa iusto quas possimus corporis? Iste explicabo nostrum consequatur quae vitae? Eum quisquam recusandae explicabo aut nesciunt architecto earum tenetur harum assumenda quae ad fugiat, reprehenderit nihil sit suscipit quam temporibus natus adipisci officia corporis odit consequuntur ut dolor? Harum inventore voluptatem debitis doloribus illum, facilis impedit animi, velit nemo nesciunt tenetur, est quidem quis soluta nisi! Perspiciatis error enim maxime rerum illo eius veritatis alias dolore sint, repellat ipsum, ipsa explicabo fugiat itaque deserunt. Beatae, distinctio rem deserunt mollitia iste fuga quam tenetur repellendus non ea natus in exercitationem. Qui placeat cum, voluptatibus error quasi, in fugit earum ipsam laudantium repellendus a praesentium nostrum nam asperiores iure impedit accusamus ut? Laboriosam consectetur esse expedita necessitatibus ut debitis accusantium quo. Repellat labore, atque sequi veritatis accusamus iure dignissimos! Corrupti laudantium, cumque quae modi perspiciatis excepturi repudiandae repellendus eius expedita sit ratione officiis cum eveniet earum neque vitae assumenda ab quod error repellat et! Assumenda ad et, beatae, dolorum laudantium asperiores sunt aliquid nemo dolore saepe iste maxime, nulla esse maiores dignissimos. Quis, nisi? Recusandae, assumenda laudantium autem commodi amet pariatur nulla numquam eveniet expedita, mollitia quae. Velit nam voluptate reprehenderit necessitatibus labore eum eveniet incidunt placeat corrupti assumenda facilis accusantium exercitationem veritatis suscipit tempore aliquid similique odio cum sed, maxime ea mollitia. Laborum inventore aliquam quibusdam.</p>
        </div>
      </MaxWrapper>
      </>
  )
}
