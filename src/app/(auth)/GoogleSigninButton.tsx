'use client'

import { supabaseClient } from '@/supabase'
import React from 'react'

const GoogleSigninButton = () => {
    async function handleSignInWithGoogle(response: any) {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
              queryParams: {
                access_type: 'offline',
                prompt: 'consent',
              },
            },
          })
          
      }
      
  return (
    <div onClick={handleSignInWithGoogle}>
        <div
        id="g_id_onload"
        data-client_id="<client ID>"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-nonce=""
        data-auto_select="true"
        data-itp_support="true"
        >Sign in</div>

        <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
        >Sign</div>

    </div>
  )
}

export default GoogleSigninButton