"use client";
import { useState } from 'react';
import { createClient } from '../../lib/supabase/client';
import '../login.css';

export default function Login() {
  const supabase = createClient();
  const [mode,setMode]=useState('login'), [email,setEmail]=useState(''), [password,setPassword]=useState(''), [name,setName]=useState(''), [msg,setMsg]=useState(''), [loading,setLoading]=useState(false);
  async function submit(e){e.preventDefault();setLoading(true);setMsg('');
    if(mode==='login'){const {error}=await supabase.auth.signInWithPassword({email,password}); if(error)setMsg(error.message); else location.href='/';}
    else {const {data,error}=await supabase.auth.signUp({email,password,options:{data:{full_name:name}}}); if(error)setMsg(error.message); else setMsg(data.session?'Akun dibuat.':'Akun dibuat. Cek email jika verifikasi email aktif.');}
    setLoading(false);
  }
  return <main className="login-page"><div className="login-card"><div className="login-logo">A</div><div className="eyebrow">ACADEMIC HUB B24</div><h1>{mode==='login'?'Selamat datang kembali':'Buat akun mahasiswa'}</h1><p>{mode==='login'?'Masuk untuk melihat jadwal, tugas, dan deadline.':'Buat akun untuk mengakses dashboard akademik.'}</p>
    <form onSubmit={submit}>{mode==='signup'&&<label>Nama<input value={name} onChange={e=>setName(e.target.value)} required /></label>}<label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label><label>Password<input type="password" minLength="6" value={password} onChange={e=>setPassword(e.target.value)} required /></label>{msg&&<div className="login-msg">{msg}</div>}<button className="login-btn" disabled={loading}>{loading?'Memproses…':mode==='login'?'Masuk':'Daftar'}</button></form>
    <button className="switch" onClick={()=>{setMode(mode==='login'?'signup':'login');setMsg('')}}>{mode==='login'?'Belum punya akun? Daftar':'Sudah punya akun? Masuk'}</button>
  </div></main>
}
