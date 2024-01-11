import { supabaseClient } from '@/supabase';
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import { useEffect } from 'react';

const NotificationsComponent = () => {
  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabaseClient
        .from('notifications')
        .select('*')
        .order('timestamp', { ascending: false });

      if (data) {
      }

      const subscription = supabaseClient
        // .from('notifications')
        // .on('INSERT', (payload: RealtimePostgresInsertPayload<Notification>) => {
        //   // Handle new notification
        //   const newNotification = payload.new;
        //   // Update your component state or take any necessary action
        // })
        // .subscribe();

      // Cleanup subscription on component unmount
      return () => {
        // subscription.unsubscribe();
      };
    };

    fetchNotifications();
  }, []);

//   return (
//     // Render your notifications
//   );
};

export default NotificationsComponent;
