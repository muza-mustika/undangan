import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Download, Copy, FileDown, Plus, X, User } from 'lucide-react';
import { InvitationData } from '../../../data/invitation-templates';
import { TemplateFactory, TemplateUtils } from '../../../utils/template-loader';
import { StaticGenerator } from '../../../utils/static-generator';

const CreateInvitation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [templateId, setTemplateId] = useState<string>('design-1');
  const [invitationData, setInvitationData] = useState<InvitationData>({
    groomName: '',
    groomTitlesBefore: [],
    groomTitlesAfter: [],
    brideName: '',
    brideTitlesBefore: [],
    brideTitlesAfter: [],
    brideParents: '',
    groomParents: '',
    weddingDate: '',
    weddingDay: '',
    akadTime: '',
    akadLocation: '',
    resepsiTime: '',
    resepsiLocation: '',
    quote: '',
    quoteSource: ''
  });
  const [isPreview, setIsPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load template data from navigation state
  useEffect(() => {
    if (location.state?.templateId && location.state?.defaultData) {
      setTemplateId(location.state.templateId);
      setInvitationData(location.state.defaultData);
    }
  }, [location.state]);

  const handleInputChange = (field: keyof InvitationData, value: string) => {
    setInvitationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      const invitationDataToSave = {
        title: `Pernikahan ${invitationData.groomName} & ${invitationData.brideName}`,
        template_id: templateId,
        bride_name: invitationData.brideName,
        groom_name: invitationData.groomName,
        bride_titles_before: JSON.stringify(invitationData.brideTitlesBefore),
        bride_titles_after: JSON.stringify(invitationData.brideTitlesAfter),
        groom_titles_before: JSON.stringify(invitationData.groomTitlesBefore),
        groom_titles_after: JSON.stringify(invitationData.groomTitlesAfter),
        bride_parents: invitationData.brideParents,
        groom_parents: invitationData.groomParents,
        wedding_date: invitationData.weddingDate,
        wedding_day: invitationData.weddingDay,
        akad_time: invitationData.akadTime,
        akad_location: invitationData.akadLocation,
        resepsi_time: invitationData.resepsiTime,
        resepsi_location: invitationData.resepsiLocation,
        quote: invitationData.quote,
        quote_source: invitationData.quoteSource
      };

      const response = await fetch('/api/invitations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(invitationDataToSave)
      });

      if (response.ok) {
        const savedInvitation = await response.json();
        alert('Undangan berhasil disimpan ke database!');
        navigate('/dashboard');
      } else {
        const error = await response.json();
        alert(`Gagal menyimpan: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error saving invitation:', error);
      alert('Gagal menyimpan undangan. Silakan coba lagi.');
    }
  };

  const handleCopyData = async () => {
    try {
      const jsonData = TemplateUtils.exportTemplateData(templateId, invitationData);
      await navigator.clipboard.writeText(jsonData);
      alert('Data undangan berhasil disalin ke clipboard!');
    } catch (error) {
      console.error('Error copying data:', error);
      alert('Gagal menyalin data undangan');
    }
  };

  const handleDownloadData = () => {
    try {
      const dataStr = JSON.stringify(invitationData, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `undangan-${templateId}-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading data:', error);
      alert('Gagal mengunduh data undangan');
    }
  };

  const handleDownloadHTML = () => {
    try {
      StaticGenerator.downloadStaticHTML(invitationData);
      alert('HTML statis berhasil diunduh! File bisa dibuka tanpa internet.');
    } catch (error) {
      console.error('Error downloading HTML:', error);
      alert('Gagal mengunduh HTML statis');
    }
  };

  const getTemplateComponent = () => {
    switch (templateId) {
      case 'design-1':
        return <TemplateFactory templateId="design-1" data={invitationData} />;
      case 'design-2':
        return <TemplateFactory templateId="design-2" data={invitationData} />;
      default:
        return <TemplateFactory templateId="design-1" data={invitationData} />;
    }
  };

  if (isPreview) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Preview Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPreview(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">Preview Undangan</h1>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Save className="w-4 h-4" />
                Simpan
              </button>
              <button
                onClick={handleCopyData}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="Salin Data"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={handleDownloadData}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="Download Data"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="h-[calc(100vh-73px)] overflow-hidden">
          {getTemplateComponent()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Content Section */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl relative">
          <div className="text-center mb-6">
            <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Buat Undangan Pernikahan</h1>
            <p className="text-xs md:text-sm text-gray-600 mb-1">Isi detail undangan pernikahan Anda</p>
            <p className="text-xs md:text-sm text-gray-500">Lengkapi formulir di bawah ini</p>
          </div>

          <div className="space-y-4">
            {/* Groom Name with Titles */}
            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-semibold text-[#5085B1] z-10">
                Nama Pengantin Pria
              </label>
              <div className="flex pt-2 border-2 border-[#5085B1] rounded-xl">
                <User className="w-5 h-5 text-gray-400 mx-3 self-center" />
                <input
                  type="text"
                  value={invitationData.groomName}
                  onChange={(e) => handleInputChange('groomName', e.target.value)}
                  className="flex-1 px-3 py-3 border-none outline-none text-gray-900 placeholder-gray-400 text-base"
                  placeholder="Masukkan nama pengantin pria"
                />
              </div>
            </div>

            {/* Groom Titles Before */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gelar Sebelum Nama (Pria)</label>
              <div className="space-y-2">
                {invitationData.groomTitlesBefore.map((title, index) => (
                  <div key={index} className="flex gap-2">
                    <select
                      value={title}
                      onChange={(e) => {
                        const newTitles = [...invitationData.groomTitlesBefore];
                        newTitles[index] = e.target.value;
                        setInvitationData({ ...invitationData, groomTitlesBefore: newTitles });
                      }}
                      className="flex-1 px-3 py-2 border-2 border-[#5085B1] rounded-lg outline-none text-gray-900"
                    >
                      <option value="">Pilih gelar</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Dr. H.">Dr. H.</option>
                      <option value="H.">H.</option>
                      <option value="KH.">KH.</option>
                      <option value="Prof.">Prof.</option>
                      <option value="Prof. Dr.">Prof. Dr.</option>
                      <option value="Prof. Dr. H.">Prof. Dr. H.</option>
                      <option value="Ir.">Ir.</option>
                      <option value="Ir. H.">Ir. H.</option>
                      <option value="Drs.">Drs.</option>
                      <option value="Drs. H.">Drs. H.</option>
                      <option value="S.H.">S.H.</option>
                      <option value="S.H. I.">S.H. I.</option>
                      <option value="S.Kom.">S.Kom.</option>
                      <option value="S.E.">S.E.</option>
                      <option value="S.E.I.">S.E.I.</option>
                      <option value="S.T.">S.T.</option>
                      <option value="S.Pd.">S.Pd.</option>
                      <option value="S.Pd.I.">S.Pd.I.</option>
                      <option value="S.M.">S.M.</option>
                      <option value="M.M.">M.M.</option>
                      <option value="M.B.A.">M.B.A.</option>
                      <option value="M.Sc.">M.Sc.</option>
                      <option value="M.Cs.">M.Cs.</option>
                      <option value="M.Eng.">M.Eng.</option>
                      <option value="M.Pd.">M.Pd.</option>
                      <option value="M.H.">M.H.</option>
                      <option value="M.Farm.">M.Farm.</option>
                      <option value="M.Kes.">M.Kes.</option>
                      <option value="M.Ak.">M.Ak.</option>
                      <option value="M.Si.">M.Si.</option>
                      <option value="M.A.">M.A.</option>
                      <option value="M.P.H.">M.P.H.</option>
                      <option value="M.P.H.I.">M.P.H.I.</option>
                      <option value="M.Ag.">M.Ag.</option>
                      <option value="M.Kom.">M.Kom.</option>
                      <option value="M.T.">M.T.</option>
                      <option value="M.S.E.">M.S.E.</option>
                      <option value="M.Ak.">M.Ak.</option>
                      <option value="M.C.A.">M.C.A.</option>
                      <option value="M.Phil.">M.Phil.</option>
                      <option value="M.Ed.">M.Ed.</option>
                      <option value="M.P.A.">M.P.A.</option>
                      <option value="M.P.H.">M.P.H.</option>
                      <option value="M.Psi.">M.Psi.</option>
                      <option value="M.Psych.">M.Psych.</option>
                      <option value="M.Th.">M.Th.</option>
                      <option value="M.S.W.">M.S.W.</option>
                      <option value="M.P.T.">M.P.T.</option>
                      <option value="M.P.E.">M.P.E.</option>
                      <option value="M.P.Ed.">M.P.Ed.</option>
                      <option value="M.Jur.">M.Jur.</option>
                      <option value="M.L.I.S.">M.L.I.S.</option>
                      <option value="M.Lib.">M.Lib.</option>
                      <option value="M.Arch.">M.Arch.</option>
                      <option value="M.U.R.P.">M.U.R.P.</option>
                      <option value="M.C.P.">M.C.P.</option>
                      <option value="M.D.S.">M.D.S.</option>
                      <option value="M.P.H.">M.P.H.</option>
                      <option value="M.P.H.I.">M.P.H.I.</option>
                      <option value="M.Ag.">M.Ag.</option>
                      <option value="M.Kom.">M.Kom.</option>
                      <option value="M.T.">M.T.</option>
                      <option value="M.S.E.">M.S.E.</option>
                      <option value="M.Ak.">M.Ak.</option>
                      <option value="M.C.A.">M.C.A.</option>
                      <option value="M.Phil.">M.Phil.</option>
                      <option value="M.Ed.">M.Ed.</option>
                      <option value="M.P.A.">M.P.A.</option>
                      <option value="M.P.H.">M.P.H.</option>
                      <option value="M.Psi.">M.Psi.</option>
                      <option value="M.Psych.">M.Psych.</option>
                      <option value="M.Th.">M.Th.</option>
                      <option value="M.S.W.">M.S.W.</option>
                      <option value="M.P.T.">M.P.T.</option>
                      <option value="M.P.E.">M.P.E.</option>
                      <option value="M.P.Ed.">M.P.Ed.</option>
                      <option value="M.Jur.">M.Jur.</option>
                      <option value="M.L.I.S.">M.L.I.S.</option>
                      <option value="M.Lib.">M.Lib.</option>
                      <option value="M.Arch.">M.Arch.</option>
                      <option value="M.U.R.P.">M.U.R.P.</option>
                      <option value="M.C.P.">M.C.P.</option>
                      <option value="M.D.S.">M.D.S.</option>
                    </select>
                    <button
                      onClick={() => {
                        const newTitles = invitationData.groomTitlesBefore.filter((_, i) => i !== index);
                        setInvitationData({ ...invitationData, groomTitlesBefore: newTitles });
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setInvitationData({ ...invitationData, groomTitlesBefore: [...invitationData.groomTitlesBefore, ''] })}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-[#5085B1] text-[#5085B1] rounded-lg hover:bg-[#5085B1]/5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Tambah Gelar</span>
                </button>
              </div>
            </div>

            {/* Groom Titles After */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gelar Setelah Nama (Pria)</label>
              <div className="space-y-2">
                {invitationData.groomTitlesAfter.map((title, index) => (
                  <div key={index} className="flex gap-2">
                    <select
                      value={title}
                      onChange={(e) => {
                        const newTitles = [...invitationData.groomTitlesAfter];
                        newTitles[index] = e.target.value;
                        setInvitationData({ ...invitationData, groomTitlesAfter: newTitles });
                      }}
                      className="flex-1 px-3 py-2 border-2 border-[#5085B1] rounded-lg outline-none text-gray-900"
                    >
                      <option value="">Pilih gelar</option>
                      <option value="S.Ked.">S.Ked.</option>
                      <option value="S.Gz.">S.Gz.</option>
                      <option value="S.Farm.">S.Farm.</option>
                      <option value="S.K.M.">S.K.M.</option>
                      <option value="S.P.T.">S.P.T.</option>
                      <option value="S.Psi.">S.Psi.</option>
                      <option value="S.A.B.">S.A.B.</option>
                      <option value="S.H.I.">S.H.I.</option>
                      <option value="S.Pd.I.">S.Pd.I.</option>
                      <option value="S.Pd.SD.">S.Pd.SD.</option>
                      <option value="S.Pd.SMP.">S.Pd.SMP.</option>
                      <option value="S.Pd.SMA.">S.Pd.SMA.</option>
                      <option value="S.Pd.K.">S.Pd.K.</option>
                      <option value="S.Pd.LU.">S.Pd.LU.</option>
                      <option value="S.Pd.OR.">S.Pd.OR.</option>
                      <option value="S.Pd.G.">S.Pd.G.</option>
                      <option value="S.Pd.BI.">S.Pd.BI.</option>
                      <option value="S.Pd.MP.">S.Pd.MP.</option>
                      <option value="S.Pd.MAT.">S.Pd.MAT.</option>
                      <option value="S.Pd.IP.">S.Pd.IP.</option>
                      <option value="S.Pd.BING.">S.Pd.BING.</option>
                      <option value="S.Pd.B.JP.">S.Pd.B.JP.</option>
                      <option value="S.Pd.B.AR.">S.Pd.B.AR.</option>
                      <option value="S.Pd.B.MAND.">S.Pd.B.MAND.</option>
                      <option value="S.Pd.B.SUN.">S.Pd.B.SUN.</option>
                      <option value="S.Pd.B.MIN.">S.Pd.B.MIN.</option>
                      <option value="S.Pd.B.ARA.">S.Pd.B.ARA.</option>
                      <option value="S.Pd.B.PER.">S.Pd.B.PER.</option>
                      <option value="S.Pd.B.IND.">S.Pd.B.IND.</option>
                      <option value="S.Pd.B.JER.">S.Pd.B.JER.</option>
                      <option value="S.Pd.B.FRA.">S.Pd.B.FRA.</option>
                      <option value="S.Pd.B.RUS.">S.Pd.B.RUS.</option>
                      <option value="S.Pd.B.SPA.">S.Pd.B.SPA.</option>
                      <option value="S.Pd.B.ITA.">S.Pd.B.ITA.</option>
                      <option value="S.Pd.B.CHN.">S.Pd.B.CHN.</option>
                      <option value="S.Pd.B.KOR.">S.Pd.B.KOR.</option>
                      <option value="S.Pd.B.THAI.">S.Pd.B.THAI.</option>
                      <option value="S.Pd.B.VIE.">S.Pd.B.VIE.</option>
                      <option value="S.Pd.B.HIN.">S.Pd.B.HIN.</option>
                      <option value="S.Pd.B.URD.">S.Pd.B.URD.</option>
                      <option value="S.Pd.B.TUR.">S.Pd.B.TUR.</option>
                      <option value="S.Pd.B.POL.">S.Pd.B.POL.</option>
                      <option value="S.Pd.B.CZE.">S.Pd.B.CZE.</option>
                      <option value="S.Pd.B.SWE.">S.Pd.B.SWE.</option>
                      <option value="S.Pd.B.NOR.">S.Pd.B.NOR.</option>
                      <option value="S.Pd.B.DAN.">S.Pd.B.DAN.</option>
                      <option value="S.Pd.B.FIN.">S.Pd.B.FIN.</option>
                      <option value="S.Pd.B.GRE.">S.Pd.B.GRE.</option>
                      <option value="S.Pd.B.POR.">S.Pd.B.POR.</option>
                      <option value="S.Pd.B.DUT.">S.Pd.B.DUT.</option>
                      <option value="S.Pd.B.HUN.">S.Pd.B.HUN.</option>
                      <option value="S.Pd.B.ROM.">S.Pd.B.ROM.</option>
                      <option value="S.Pd.B.BUL.">S.Pd.B.BUL.</option>
                      <option value="S.Pd.B.SLO.">S.Pd.B.SLO.</option>
                      <option value="S.Pd.B.CRO.">S.Pd.B.CRO.</option>
                      <option value="S.Pd.B.SER.">S.Pd.B.SER.</option>
                      <option value="S.Pd.B.MAC.">S.Pd.B.MAC.</option>
                      <option value="S.Pd.B.ALB.">S.Pd.B.ALB.</option>
                      <option value="S.Pd.B.BOS.">S.Pd.B.BOS.</option>
                      <option value="S.Pd.B.MNE.">S.Pd.B.MNE.</option>
                      <option value="S.Pd.B.KOS.">S.Pd.B.KOS.</option>
                      <option value="S.Pd.B.LAT.">S.Pd.B.LAT.</option>
                      <option value="S.Pd.B.LIT.">S.Pd.B.LIT.</option>
                      <option value="S.Pd.B.EST.">S.Pd.B.EST.</option>
                      <option value="S.Pd.B.LAV.">S.Pd.B.LAV.</option>
                      <option value="S.Pd.B.UKR.">S.Pd.B.UKR.</option>
                      <option value="S.Pd.B.BEL.">S.Pd.B.BEL.</option>
                      <option value="S.Pd.B.LUX.">S.Pd.B.LUX.</option>
                      <option value="S.Pd.B.IRL.">S.Pd.B.IRL.</option>
                      <option value="S.Pd.B.ISL.">S.Pd.B.ISL.</option>
                      <option value="S.Pd.B.MLT.">S.Pd.B.MLT.</option>
                      <option value="S.Pd.B.CYP.">S.Pd.B.CYP.</option>
                      <option value="S.Pd.B.LIE.">S.Pd.B.LIE.</option>
                      <option value="S.Pd.B.MON.">S.Pd.B.MON.</option>
                      <option value="S.Pd.B.SAN.">S.Pd.B.SAN.</option>
                      <option value="S.Pd.B.AND.">S.Pd.B.AND.</option>
                      <option value="S.Pd.B.VAT.">S.Pd.B.VAT.</option>
                      <option value="S.Pd.B.MCO.">S.Pd.B.MCO.</option>
                      <option value="S.Pd.B.SM.">S.Pd.B.SM.</option>
                      <option value="S.Pd.B.VA.">S.Pd.B.VA.</option>
                      <option value="S.Pd.B.AD.">S.Pd.B.AD.</option>
                      <option value="S.Pd.B.GI.">S.Pd.B.GI.</option>
                      <option value="S.Pd.B.IM.">S.Pd.B.IM.</option>
                      <option value="S.Pd.B.JE.">S.Pd.B.JE.</option>
                      <option value="S.Pd.B.GG.">S.Pd.B.GG.</option>
                      <option value="S.Pd.B.AI.">S.Pd.B.AI.</option>
                      <option value="S.Pd.B.FK.">S.Pd.B.FK.</option>
                      <option value="S.Pd.B.GS.">S.Pd.B.GS.</option>
                      <option value="S.Pd.B.GU.">S.Pd.B.GU.</option>
                      <option value="S.Pd.B.IO.">S.Pd.B.IO.</option>
                      <option value="S.Pd.B.MS.">S.Pd.B.MS.</option>
                      <option value="S.Pd.B.PN.">S.Pd.B.PN.</option>
                      <option value="S.Pd.B.SH.">S.Pd.B.SH.</option>
                      <option value="S.Pd.B.SJ.">S.Pd.B.SJ.</option>
                      <option value="S.Pd.B.TC.">S.Pd.B.TC.</option>
                      <option value="S.Pd.B.VG.">S.Pd.B.VG.</option>
                      <option value="S.Pd.B.AX.">S.Pd.B.AX.</option>
                      <option value="S.Pd.B.AC.">S.Pd.B.AC.</option>
                      <option value="S.Pd.B.AE.">S.Pd.B.AE.</option>
                      <option value="S.Pd.B.AF.">S.Pd.B.AF.</option>
                      <option value="S.Pd.B.AG.">S.Pd.B.AG.</option>
                      <option value="S.Pd.B.AI.">S.Pd.B.AI.</option>
                      <option value="S.Pd.B.AL.">S.Pd.B.AL.</option>
                      <option value="S.Pd.B.AM.">S.Pd.B.AM.</option>
                      <option value="S.Pd.B.AO.">S.Pd.B.AO.</option>
                      <option value="S.Pd.B.AQ.">S.Pd.B.AQ.</option>
                      <option value="S.Pd.B.AR.">S.Pd.B.AR.</option>
                      <option value="S.Pd.B.AS.">S.Pd.B.AS.</option>
                      <option value="S.Pd.B.AT.">S.Pd.B.AT.</option>
                      <option value="S.Pd.B.AU.">S.Pd.B.AU.</option>
                      <option value="S.Pd.B.AW.">S.Pd.B.AW.</option>
                      <option value="S.Pd.B.AZ.">S.Pd.B.AZ.</option>
                      <option value="S.Pd.B.BA.">S.Pd.B.BA.</option>
                      <option value="S.Pd.B.BB.">S.Pd.B.BB.</option>
                      <option value="S.Pd.B.BD.">S.Pd.B.BD.</option>
                      <option value="S.Pd.B.BE.">S.Pd.B.BE.</option>
                      <option value="S.Pd.B.BF.">S.Pd.B.BF.</option>
                      <option value="S.Pd.B.BG.">S.Pd.B.BG.</option>
                      <option value="S.Pd.B.BH.">S.Pd.B.BH.</option>
                      <option value="S.Pd.B.BI.">S.Pd.B.BI.</option>
                      <option value="S.Pd.B.BJ.">S.Pd.B.BJ.</option>
                      <option value="S.Pd.B.BK.">S.Pd.B.BK.</option>
                      <option value="S.Pd.B.BL.">S.Pd.B.BL.</option>
                      <option value="S.Pd.B.BM.">S.Pd.B.BM.</option>
                      <option value="S.Pd.B.BN.">S.Pd.B.BN.</option>
                      <option value="S.Pd.B.BO.">S.Pd.B.BO.</option>
                      <option value="S.Pd.B.BQ.">S.Pd.B.BQ.</option>
                      <option value="S.Pd.B.BR.">S.Pd.B.BR.</option>
                      <option value="S.Pd.B.BS.">S.Pd.B.BS.</option>
                      <option value="S.Pd.B.BT.">S.Pd.B.BT.</option>
                      <option value="S.Pd.B.BV.">S.Pd.B.BV.</option>
                      <option value="S.Pd.B.BW.">S.Pd.B.BW.</option>
                      <option value="S.Pd.B.BY.">S.Pd.B.BY.</option>
                      <option value="S.Pd.B.BZ.">S.Pd.B.BZ.</option>
                      <option value="S.Pd.B.CA.">S.Pd.B.CA.</option>
                      <option value="S.Pd.B.CC.">S.Pd.B.CC.</option>
                      <option value="S.Pd.B.CD.">S.Pd.B.CD.</option>
                      <option value="S.Pd.B.CF.">S.Pd.B.CF.</option>
                      <option value="S.Pd.B.CG.">S.Pd.B.CG.</option>
                      <option value="S.Pd.B.CH.">S.Pd.B.CH.</option>
                      <option value="S.Pd.B.CI.">S.Pd.B.CI.</option>
                      <option value="S.Pd.B.CK.">S.Pd.B.CK.</option>
                      <option value="S.Pd.B.CL.">S.Pd.B.CL.</option>
                      <option value="S.Pd.B.CM.">S.Pd.B.CM.</option>
                      <option value="S.Pd.B.CN.">S.Pd.B.CN.</option>
                      <option value="S.Pd.B.CO.">S.Pd.B.CO.</option>
                      <option value="S.Pd.B.CR.">S.Pd.B.CR.</option>
                      <option value="S.Pd.B.CU.">S.Pd.B.CU.</option>
                      <option value="S.Pd.B.CV.">S.Pd.B.CV.</option>
                      <option value="S.Pd.B.CW.">S.Pd.B.CW.</option>
                      <option value="S.Pd.B.CX.">S.Pd.B.CX.</option>
                      <option value="S.Pd.B.CY.">S.Pd.B.CY.</option>
                      <option value="S.Pd.B.CZ.">S.Pd.B.CZ.</option>
                      <option value="S.Pd.B.DE.">S.Pd.B.DE.</option>
                      <option value="S.Pd.B.DJ.">S.Pd.B.DJ.</option>
                      <option value="S.Pd.B.DK.">S.Pd.B.DK.</option>
                      <option value="S.Pd.B.DM.">S.Pd.B.DM.</option>
                      <option value="S.Pd.B.DO.">S.Pd.B.DO.</option>
                      <option value="S.Pd.B.DZ.">S.Pd.B.DZ.</option>
                      <option value="S.Pd.B.EC.">S.Pd.B.EC.</option>
                      <option value="S.Pd.B.EE.">S.Pd.B.EE.</option>
                      <option value="S.Pd.B.EG.">S.Pd.B.EG.</option>
                      <option value="S.Pd.B.EH.">S.Pd.B.EH.</option>
                      <option value="S.Pd.B.ER.">S.Pd.B.ER.</option>
                      <option value="S.Pd.B.ES.">S.Pd.B.ES.</option>
                      <option value="S.Pd.B.ET.">S.Pd.B.ET.</option>
                      <option value="S.Pd.B.FI.">S.Pd.B.FI.</option>
                      <option value="S.Pd.B.FJ.">S.Pd.B.FJ.</option>
                      <option value="S.Pd.B.FK.">S.Pd.B.FK.</option>
                      <option value="S.Pd.B.FM.">S.Pd.B.FM.</option>
                      <option value="S.Pd.B.FO.">S.Pd.B.FO.</option>
                      <option value="S.Pd.B.FR.">S.Pd.B.FR.</option>
                      <option value="S.Pd.B.GA.">S.Pd.B.GA.</option>
                      <option value="S.Pd.B.GB.">S.Pd.B.GB.</option>
                      <option value="S.Pd.B.GD.">S.Pd.B.GD.</option>
                      <option value="S.Pd.B.GE.">S.Pd.B.GE.</option>
                      <option value="S.Pd.B.GF.">S.Pd.B.GF.</option>
                      <option value="S.Pd.B.GG.">S.Pd.B.GG.</option>
                      <option value="S.Pd.B.GH.">S.Pd.B.GH.</option>
                      <option value="S.Pd.B.GI.">S.Pd.B.GI.</option>
                      <option value="S.Pd.B.GL.">S.Pd.B.GL.</option>
                      <option value="S.Pd.B.GM.">S.Pd.B.GM.</option>
                      <option value="S.Pd.B.GN.">S.Pd.B.GN.</option>
                      <option value="S.Pd.B.GP.">S.Pd.B.GP.</option>
                      <option value="S.Pd.B.GQ.">S.Pd.B.GQ.</option>
                      <option value="S.Pd.B.GR.">S.Pd.B.GR.</option>
                      <option value="S.Pd.B.GS.">S.Pd.B.GS.</option>
                      <option value="S.Pd.B.GT.">S.Pd.B.GT.</option>
                      <option value="S.Pd.B.GU.">S.Pd.B.GU.</option>
                      <option value="S.Pd.B.GW.">S.Pd.B.GW.</option>
                      <option value="S.Pd.B.GY.">S.Pd.B.GY.</option>
                      <option value="S.Pd.B.HK.">S.Pd.B.HK.</option>
                      <option value="S.Pd.B.HM.">S.Pd.B.HM.</option>
                      <option value="S.Pd.B.HN.">S.Pd.B.HN.</option>
                      <option value="S.Pd.B.HR.">S.Pd.B.HR.</option>
                      <option value="S.Pd.B.HT.">S.Pd.B.HT.</option>
                      <option value="S.Pd.B.HU.">S.Pd.B.HU.</option>
                      <option value="S.Pd.B.ID.">S.Pd.B.ID.</option>
                      <option value="S.Pd.B.IE.">S.Pd.B.IE.</option>
                      <option value="S.Pd.B.IL.">S.Pd.B.IL.</option>
                      <option value="S.Pd.B.IM.">S.Pd.B.IM.</option>
                      <option value="S.Pd.B.IN.">S.Pd.B.IN.</option>
                      <option value="S.Pd.B.IO.">S.Pd.B.IO.</option>
                      <option value="S.Pd.B.IQ.">S.Pd.B.IQ.</option>
                      <option value="S.Pd.B.IR.">S.Pd.B.IR.</option>
                      <option value="S.Pd.B.IS.">S.Pd.B.IS.</option>
                      <option value="S.Pd.B.IT.">S.Pd.B.IT.</option>
                      <option value="S.Pd.B.JE.">S.Pd.B.JE.</option>
                      <option value="S.Pd.B.JM.">S.Pd.B.JM.</option>
                      <option value="S.Pd.B.JO.">S.Pd.B.JO.</option>
                      <option value="S.Pd.B.JP.">S.Pd.B.JP.</option>
                      <option value="S.Pd.B.KE.">S.Pd.B.KE.</option>
                      <option value="S.Pd.B.KG.">S.Pd.B.KG.</option>
                      <option value="S.Pd.B.KH.">S.Pd.B.KH.</option>
                      <option value="S.Pd.B.KI.">S.Pd.B.KI.</option>
                      <option value="S.Pd.B.KM.">S.Pd.B.KM.</option>
                      <option value="S.Pd.B.KN.">S.Pd.B.KN.</option>
                      <option value="S.Pd.B.KP.">S.Pd.B.KP.</option>
                      <option value="S.Pd.B.KR.">S.Pd.B.KR.</option>
                      <option value="S.Pd.B.KW.">S.Pd.B.KW.</option>
                      <option value="S.Pd.B.KY.">S.Pd.B.KY.</option>
                      <option value="S.Pd.B.KZ.">S.Pd.B.KZ.</option>
                      <option value="S.Pd.B.LA.">S.Pd.B.LA.</option>
                      <option value="S.Pd.B.LB.">S.Pd.B.LB.</option>
                      <option value="S.Pd.B.LC.">S.Pd.B.LC.</option>
                      <option value="S.Pd.B.LI.">S.Pd.B.LI.</option>
                      <option value="S.Pd.B.LK.">S.Pd.B.LK.</option>
                      <option value="S.Pd.B.LR.">S.Pd.B.LR.</option>
                      <option value="S.Pd.B.LS.">S.Pd.B.LS.</option>
                      <option value="S.Pd.B.LT.">S.Pd.B.LT.</option>
                      <option value="S.Pd.B.LU.">S.Pd.B.LU.</option>
                      <option value="S.Pd.B.LV.">S.Pd.B.LV.</option>
                      <option value="S.Pd.B.LY.">S.Pd.B.LY.</option>
                      <option value="S.Pd.B.MA.">S.Pd.B.MA.</option>
                      <option value="S.Pd.B.MC.">S.Pd.B.MC.</option>
                      <option value="S.Pd.B.MD.">S.Pd.B.MD.</option>
                      <option value="S.Pd.B.ME.">S.Pd.B.ME.</option>
                      <option value="S.Pd.B.MF.">S.Pd.B.MF.</option>
                      <option value="S.Pd.B.MG.">S.Pd.B.MG.</option>
                      <option value="S.Pd.B.MH.">S.Pd.B.MH.</option>
                      <option value="S.Pd.B.MK.">S.Pd.B.MK.</option>
                      <option value="S.Pd.B.ML.">S.Pd.B.ML.</option>
                      <option value="S.Pd.B.MM.">S.Pd.B.MM.</option>
                      <option value="S.Pd.B.MN.">S.Pd.B.MN.</option>
                      <option value="S.Pd.B.MO.">S.Pd.B.MO.</option>
                      <option value="S.Pd.B.MP.">S.Pd.B.MP.</option>
                      <option value="S.Pd.B.MQ.">S.Pd.B.MQ.</option>
                      <option value="S.Pd.B.MR.">S.Pd.B.MR.</option>
                      <option value="S.Pd.B.MS.">S.Pd.B.MS.</option>
                      <option value="S.Pd.B.MT.">S.Pd.B.MT.</option>
                      <option value="S.Pd.B.MU.">S.Pd.B.MU.</option>
                      <option value="S.Pd.B.MV.">S.Pd.B.MV.</option>
                      <option value="S.Pd.B.MW.">S.Pd.B.MW.</option>
                      <option value="S.Pd.B.MX.">S.Pd.B.MX.</option>
                      <option value="S.Pd.B.MY.">S.Pd.B.MY.</option>
                      <option value="S.Pd.B.MZ.">S.Pd.B.MZ.</option>
                      <option value="S.Pd.B.NA.">S.Pd.B.NA.</option>
                      <option value="S.Pd.B.NC.">S.Pd.B.NC.</option>
                      <option value="S.Pd.B.NE.">S.Pd.B.NE.</option>
                      <option value="S.Pd.B.NF.">S.Pd.B.NF.</option>
                      <option value="S.Pd.B.NG.">S.Pd.B.NG.</option>
                      <option value="S.Pd.B.NI.">S.Pd.B.NI.</option>
                      <option value="S.Pd.B.NL.">S.Pd.B.NL.</option>
                      <option value="S.Pd.B.NO.">S.Pd.B.NO.</option>
                      <option value="S.Pd.B.NP.">S.Pd.B.NP.</option>
                      <option value="S.Pd.B.NR.">S.Pd.B.NR.</option>
                      <option value="S.Pd.B.NU.">S.Pd.B.NU.</option>
                      <option value="S.Pd.B.NZ.">S.Pd.B.NZ.</option>
                      <option value="S.Pd.B.OM.">S.Pd.B.OM.</option>
                      <option value="S.Pd.B.PA.">S.Pd.B.PA.</option>
                      <option value="S.Pd.B.PE.">S.Pd.B.PE.</option>
                      <option value="S.Pd.B.PF.">S.Pd.B.PF.</option>
                      <option value="S.Pd.B.PG.">S.Pd.B.PG.</option>
                      <option value="S.Pd.B.PH.">S.Pd.B.PH.</option>
                      <option value="S.Pd.B.PK.">S.Pd.B.PK.</option>
                      <option value="S.Pd.B.PL.">S.Pd.B.PL.</option>
                      <option value="S.Pd.B.PM.">S.Pd.B.PM.</option>
                      <option value="S.Pd.B.PN.">S.Pd.B.PN.</option>
                      <option value="S.Pd.B.PR.">S.Pd.B.PR.</option>
                      <option value="S.Pd.B.PS.">S.Pd.B.PS.</option>
                      <option value="S.Pd.B.PT.">S.Pd.B.PT.</option>
                      <option value="S.Pd.B.PW.">S.Pd.B.PW.</option>
                      <option value="S.Pd.B.PY.">S.Pd.B.PY.</option>
                      <option value="S.Pd.B.QA.">S.Pd.B.QA.</option>
                      <option value="S.Pd.B.RE.">S.Pd.B.RE.</option>
                      <option value="S.Pd.B.RO.">S.Pd.B.RO.</option>
                      <option value="S.Pd.B.RS.">S.Pd.B.RS.</option>
                      <option value="S.Pd.B.RU.">S.Pd.B.RU.</option>
                      <option value="S.Pd.B.RW.">S.Pd.B.RW.</option>
                      <option value="S.Pd.B.SA.">S.Pd.B.SA.</option>
                      <option value="S.Pd.B.SB.">S.Pd.B.SB.</option>
                      <option value="S.Pd.B.SC.">S.Pd.B.SC.</option>
                      <option value="S.Pd.B.SD.">S.Pd.B.SD.</option>
                      <option value="S.Pd.B.SE.">S.Pd.B.SE.</option>
                      <option value="S.Pd.B.SG.">S.Pd.B.SG.</option>
                      <option value="S.Pd.B.SH.">S.Pd.B.SH.</option>
                      <option value="S.Pd.B.SI.">S.Pd.B.SI.</option>
                      <option value="S.Pd.B.SJ.">S.Pd.B.SJ.</option>
                      <option value="S.Pd.B.SK.">S.Pd.B.SK.</option>
                      <option value="S.Pd.B.SL.">S.Pd.B.SL.</option>
                      <option value="S.Pd.B.SM.">S.Pd.B.SM.</option>
                      <option value="S.Pd.B.SN.">S.Pd.B.SN.</option>
                      <option value="S.Pd.B.SO.">S.Pd.B.SO.</option>
                      <option value="S.Pd.B.SR.">S.Pd.B.SR.</option>
                      <option value="S.Pd.B.SS.">S.Pd.B.SS.</option>
                      <option value="S.Pd.B.ST.">S.Pd.B.ST.</option>
                      <option value="S.Pd.B.SV.">S.Pd.B.SV.</option>
                      <option value="S.Pd.B.SX.">S.Pd.B.SX.</option>
                      <option value="S.Pd.B.SY.">S.Pd.B.SY.</option>
                      <option value="S.Pd.B.SZ.">S.Pd.B.SZ.</option>
                      <option value="S.Pd.B.TC.">S.Pd.B.TC.</option>
                      <option value="S.Pd.B.TD.">S.Pd.B.TD.</option>
                      <option value="S.Pd.B.TF.">S.Pd.B.TF.</option>
                      <option value="S.Pd.B.TG.">S.Pd.B.TG.</option>
                      <option value="S.Pd.B.TH.">S.Pd.B.TH.</option>
                      <option value="S.Pd.B.TJ.">S.Pd.B.TJ.</option>
                      <option value="S.Pd.B.TK.">S.Pd.B.TK.</option>
                      <option value="S.Pd.B.TL.">S.Pd.B.TL.</option>
                      <option value="S.Pd.B.TM.">S.Pd.B.TM.</option>
                      <option value="S.Pd.B.TN.">S.Pd.B.TN.</option>
                      <option value="S.Pd.B.TO.">S.Pd.B.TO.</option>
                      <option value="S.Pd.B.TR.">S.Pd.B.TR.</option>
                      <option value="S.Pd.B.TT.">S.Pd.B.TT.</option>
                      <option value="S.Pd.B.TV.">S.Pd.B.TV.</option>
                      <option value="S.Pd.B.TW.">S.Pd.B.TW.</option>
                      <option value="S.Pd.B.TZ.">S.Pd.B.TZ.</option>
                      <option value="S.Pd.B.UA.">S.Pd.B.UA.</option>
                      <option value="S.Pd.B.UG.">S.Pd.B.UG.</option>
                      <option value="S.Pd.B.UM.">S.Pd.B.UM.</option>
                      <option value="S.Pd.B.US.">S.Pd.B.US.</option>
                      <option value="S.Pd.B.UY.">S.Pd.B.UY.</option>
                      <option value="S.Pd.B.UZ.">S.Pd.B.UZ.</option>
                      <option value="S.Pd.B.VA.">S.Pd.B.VA.</option>
                      <option value="S.Pd.B.VC.">S.Pd.B.VC.</option>
                      <option value="S.Pd.B.VE.">S.Pd.B.VE.</option>
                      <option value="S.Pd.B.VG.">S.Pd.B.VG.</option>
                      <option value="S.Pd.B.VI.">S.Pd.B.VI.</option>
                      <option value="S.Pd.B.VN.">S.Pd.B.VN.</option>
                      <option value="S.Pd.B.VU.">S.Pd.B.VU.</option>
                      <option value="S.Pd.B.WF.">S.Pd.B.WF.</option>
                      <option value="S.Pd.B.WS.">S.Pd.B.WS.</option>
                      <option value="S.Pd.B.YE.">S.Pd.B.YE.</option>
                      <option value="S.Pd.B.YT.">S.Pd.B.YT.</option>
                      <option value="S.Pd.B.YU.">S.Pd.B.YU.</option>
                      <option value="S.Pd.B.ZA.">S.Pd.B.ZA.</option>
                      <option value="S.Pd.B.ZM.">S.Pd.B.ZM.</option>
                      <option value="S.Pd.B.ZW.">S.Pd.B.ZW.</option>
                    </select>
                    <button
                      onClick={() => {
                        const newTitles = invitationData.groomTitlesAfter.filter((_, i) => i !== index);
                        setInvitationData({ ...invitationData, groomTitlesAfter: newTitles });
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setInvitationData({ ...invitationData, groomTitlesAfter: [...invitationData.groomTitlesAfter, ''] })}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-[#5085B1] text-[#5085B1] rounded-lg hover:bg-[#5085B1]/5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Tambah Gelar</span>
                </button>
              </div>
            </div>

            {/* Bride Name with Titles */}
            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-semibold text-[#5085B1] z-10">
                Nama Pengantin Wanita
              </label>
              <div className="flex pt-2 border-2 border-[#5085B1] rounded-xl">
                <User className="w-5 h-5 text-gray-400 mx-3 self-center" />
                <input
                  type="text"
                  value={invitationData.brideName}
                  onChange={(e) => handleInputChange('brideName', e.target.value)}
                  className="flex-1 px-3 py-3 border-none outline-none text-gray-900 placeholder-gray-400 text-base"
                  placeholder="Masukkan nama pengantin wanita"
                />
              </div>
            </div>

            {/* Bride Titles Before */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gelar Sebelum Nama (Wanita)</label>
              <div className="space-y-2">
                {invitationData.brideTitlesBefore.map((title, index) => (
                  <div key={index} className="flex gap-2">
                    <select
                      value={title}
                      onChange={(e) => {
                        const newTitles = [...invitationData.brideTitlesBefore];
                        newTitles[index] = e.target.value;
                        setInvitationData({ ...invitationData, brideTitlesBefore: newTitles });
                      }}
                      className="flex-1 px-3 py-2 border-2 border-[#5085B1] rounded-lg outline-none text-gray-900"
                    >
                      <option value="">Pilih gelar</option>
                      <option value="Dr.">Dr.</option>
                      <option value="Dr. Hj.">Dr. Hj.</option>
                      <option value="Hj.">Hj.</option>
                      <option value="Ny.">Ny.</option>
                      <option value="Prof.">Prof.</option>
                      <option value="Prof. Dr.">Prof. Dr.</option>
                      <option value="Prof. Dr. Hj.">Prof. Dr. Hj.</option>
                      <option value="Ir.">Ir.</option>
                      <option value="Ir. Hj.">Ir. Hj.</option>
                      <option value="Dra.">Dra.</option>
                      <option value="Dra. Hj.">Dra. Hj.</option>
                      <option value="S.H.">S.H.</option>
                      <option value="S.H. I.">S.H. I.</option>
                      <option value="S.Kom.">S.Kom.</option>
                      <option value="S.E.">S.E.</option>
                      <option value="S.E.I.">S.E.I.</option>
                      <option value="S.T.">S.T.</option>
                      <option value="S.Pd.">S.Pd.</option>
                      <option value="S.Pd.I.">S.Pd.I.</option>
                      <option value="S.M.">S.M.</option>
                      <option value="M.M.">M.M.</option>
                      <option value="M.B.A.">M.B.A.</option>
                      <option value="M.Sc.">M.Sc.</option>
                      <option value="M.Cs.">M.Cs.</option>
                      <option value="M.Eng.">M.Eng.</option>
                      <option value="M.Pd.">M.Pd.</option>
                      <option value="M.H.">M.H.</option>
                      <option value="M.Farm.">M.Farm.</option>
                      <option value="M.Kes.">M.Kes.</option>
                      <option value="M.Ak.">M.Ak.</option>
                      <option value="M.Si.">M.Si.</option>
                      <option value="M.A.">M.A.</option>
                      <option value="M.P.H.">M.P.H.</option>
                      <option value="M.P.H.I.">M.P.H.I.</option>
                      <option value="M.Ag.">M.Ag.</option>
                      <option value="M.Kom.">M.Kom.</option>
                      <option value="M.T.">M.T.</option>
                      <option value="M.S.E.">M.S.E.</option>
                      <option value="M.Ak.">M.Ak.</option>
                      <option value="M.C.A.">M.C.A.</option>
                      <option value="M.Phil.">M.Phil.</option>
                      <option value="M.Ed.">M.Ed.</option>
                      <option value="M.P.A.">M.P.A.</option>
                      <option value="M.P.H.">M.P.H.</option>
                      <option value="M.Psi.">M.Psi.</option>
                      <option value="M.Psych.">M.Psych.</option>
                      <option value="M.Th.">M.Th.</option>
                      <option value="M.S.W.">M.S.W.</option>
                      <option value="M.P.T.">M.P.T.</option>
                      <option value="M.P.E.">M.P.E.</option>
                      <option value="M.P.Ed.">M.P.Ed.</option>
                      <option value="M.Jur.">M.Jur.</option>
                      <option value="M.L.I.S.">M.L.I.S.</option>
                      <option value="M.Lib.">M.Lib.</option>
                      <option value="M.Arch.">M.Arch.</option>
                      <option value="M.U.R.P.">M.U.R.P.</option>
                      <option value="M.C.P.">M.C.P.</option>
                      <option value="M.D.S.">M.D.S.</option>
                    </select>
                    <button
                      onClick={() => {
                        const newTitles = invitationData.brideTitlesBefore.filter((_, i) => i !== index);
                        setInvitationData({ ...invitationData, brideTitlesBefore: newTitles });
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setInvitationData({ ...invitationData, brideTitlesBefore: [...invitationData.brideTitlesBefore, ''] })}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-[#5085B1] text-[#5085B1] rounded-lg hover:bg-[#5085B1]/5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Tambah Gelar</span>
                </button>
              </div>
            </div>

            {/* Bride Titles After */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gelar Setelah Nama (Wanita)</label>
              <div className="space-y-2">
                {invitationData.brideTitlesAfter.map((title, index) => (
                  <div key={index} className="flex gap-2">
                    <select
                      value={title}
                      onChange={(e) => {
                        const newTitles = [...invitationData.brideTitlesAfter];
                        newTitles[index] = e.target.value;
                        setInvitationData({ ...invitationData, brideTitlesAfter: newTitles });
                      }}
                      className="flex-1 px-3 py-2 border-2 border-[#5085B1] rounded-lg outline-none text-gray-900"
                    >
                      <option value="">Pilih gelar</option>
                      <option value="S.Ked.">S.Ked.</option>
                      <option value="S.Gz.">S.Gz.</option>
                      <option value="S.Farm.">S.Farm.</option>
                      <option value="S.K.M.">S.K.M.</option>
                      <option value="S.P.T.">S.P.T.</option>
                      <option value="S.Psi.">S.Psi.</option>
                      <option value="S.A.B.">S.A.B.</option>
                      <option value="S.H.I.">S.H.I.</option>
                      <option value="S.Pd.I.">S.Pd.I.</option>
                    </select>
                    <button
                      onClick={() => {
                        const newTitles = invitationData.brideTitlesAfter.filter((_, i) => i !== index);
                        setInvitationData({ ...invitationData, brideTitlesAfter: newTitles });
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setInvitationData({ ...invitationData, brideTitlesAfter: [...invitationData.brideTitlesAfter, ''] })}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-[#5085B1] text-[#5085B1] rounded-lg hover:bg-[#5085B1]/5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Tambah Gelar</span>
                </button>
              </div>
            </div>

            {/* Groom Parents */}
            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-semibold text-[#5085B1] z-10">
                Orang Tua Pengantin Pria
              </label>
              <div className="flex pt-2 border-2 border-[#5085B1] rounded-xl">
                <textarea
                  value={invitationData.groomParents}
                  onChange={(e) => handleInputChange('groomParents', e.target.value)}
                  className="flex-1 px-3 py-3 border-none outline-none text-gray-900 placeholder-gray-400 text-base resize-none"
                  rows={2}
                  placeholder="Bapak ... & Ibu ..."
                />
              </div>
            </div>

            {/* Bride Parents */}
            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-semibold text-[#5085B1] z-10">
                Orang Tua Pengantin Wanita
              </label>
              <div className="flex pt-2 border-2 border-[#5085B1] rounded-xl">
                <textarea
                  value={invitationData.brideParents}
                  onChange={(e) => handleInputChange('brideParents', e.target.value)}
                  className="flex-1 px-3 py-3 border-none outline-none text-gray-900 placeholder-gray-400 text-base resize-none"
                  rows={2}
                  placeholder="Bapak ... & Ibu ..."
                />
              </div>
            </div>

            {/* Wedding Date */}
            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-semibold text-[#5085B1] z-10">
                Tanggal Pernikahan
              </label>
              <div className="flex pt-2 border-2 border-[#5085B1] rounded-xl">
                <input
                  type="text"
                  value={invitationData.weddingDate}
                  onChange={(e) => handleInputChange('weddingDate', e.target.value)}
                  className="flex-1 px-3 py-3 border-none outline-none text-gray-900 placeholder-gray-400 text-base"
                  placeholder="12 Juli 2025"
                />
              </div>
            </div>

            {/* Wedding Day */}
            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-semibold text-[#5085B1] z-10">
                Hari
              </label>
              <div className="flex pt-2 border-2 border-[#5085B1] rounded-xl">
                <input
                  type="text"
                  value={invitationData.weddingDay}
                  onChange={(e) => handleInputChange('weddingDay', e.target.value)}
                  className="flex-1 px-3 py-3 border-none outline-none text-gray-900 placeholder-gray-400 text-base"
                  placeholder="Sabtu"
                />
              </div>
            </div>

            {/* Akad Time */}
            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-semibold text-[#5085B1] z-10">
                Waktu Akad Nikah
              </label>
              <div className="flex pt-2 border-2 border-[#5085B1] rounded-xl">
                <input
                  type="text"
                  value={invitationData.akadTime}
                  onChange={(e) => handleInputChange('akadTime', e.target.value)}
                  className="flex-1 px-3 py-3 border-none outline-none text-gray-900 placeholder-gray-400 text-base"
                  placeholder="08.00 — 10.00 WIB"
                />
              </div>
            </div>

            {/* Akad Location */}
            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-semibold text-[#5085B1] z-10">
                Lokasi Akad Nikah
              </label>
              <div className="flex pt-2 border-2 border-[#5085B1] rounded-xl">
                <textarea
                  value={invitationData.akadLocation}
                  onChange={(e) => handleInputChange('akadLocation', e.target.value)}
                  className="flex-1 px-3 py-3 border-none outline-none text-gray-900 placeholder-gray-400 text-base resize-none"
                  rows={2}
                  placeholder="Masukkan lokasi akad"
                />
              </div>
            </div>

            {/* Resepsi Time */}
            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-semibold text-[#5085B1] z-10">
                Waktu Resepsi
              </label>
              <div className="flex pt-2 border-2 border-[#5085B1] rounded-xl">
                <input
                  type="text"
                  value={invitationData.resepsiTime}
                  onChange={(e) => handleInputChange('resepsiTime', e.target.value)}
                  className="flex-1 px-3 py-3 border-none outline-none text-gray-900 placeholder-gray-400 text-base"
                  placeholder="11.00 — 21.00 WIB"
                />
              </div>
            </div>

            {/* Resepsi Location */}
            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-semibold text-[#5085B1] z-10">
                Lokasi Resepsi
              </label>
              <div className="flex pt-2 border-2 border-[#5085B1] rounded-xl">
                <textarea
                  value={invitationData.resepsiLocation}
                  onChange={(e) => handleInputChange('resepsiLocation', e.target.value)}
                  className="flex-1 px-3 py-3 border-none outline-none text-gray-900 placeholder-gray-400 text-base resize-none"
                  rows={2}
                  placeholder="Masukkan lokasi resepsi"
                />
              </div>
            </div>

            {/* Quote */}
            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-semibold text-[#5085B1] z-10">
                Kutipan
              </label>
              <div className="flex pt-2 border-2 border-[#5085B1] rounded-xl">
                <textarea
                  value={invitationData.quote}
                  onChange={(e) => handleInputChange('quote', e.target.value)}
                  className="flex-1 px-3 py-3 border-none outline-none text-gray-900 placeholder-gray-400 text-base resize-none"
                  rows={3}
                  placeholder="Masukkan kutipan untuk undangan"
                />
              </div>
            </div>

            {/* Quote Source */}
            <div className="relative">
              <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-semibold text-[#5085B1] z-10">
                Sumber Kutipan
              </label>
              <div className="flex pt-2 border-2 border-[#5085B1] rounded-xl">
                <input
                  type="text"
                  value={invitationData.quoteSource}
                  onChange={(e) => handleInputChange('quoteSource', e.target.value)}
                  className="flex-1 px-3 py-3 border-none outline-none text-gray-900 placeholder-gray-400 text-base"
                  placeholder="QS. AR-RUM : 21"
                />
              </div>
            </div>
          </div>

          {/* Floating Action Buttons */}
          <div className="fixed bottom-24 right-6 flex flex-col gap-3 z-40">
            <button
              onClick={() => setIsPreview(true)}
              className="flex items-center justify-center w-14 h-14 bg-[#5085B1] text-white rounded-full shadow-lg shadow-[#5085B1]/30 hover:bg-[#3d6a8f] hover:shadow-xl transition-all duration-200 hover:scale-105"
              title="Preview Undangan"
            >
              <Eye className="w-6 h-6" />
            </button>
            <button
              onClick={handleSave}
              className="flex items-center justify-center w-14 h-14 bg-[#5085B1] text-white rounded-full shadow-lg shadow-[#5085B1]/30 hover:bg-[#3d6a8f] hover:shadow-xl transition-all duration-200 hover:scale-105"
              title="Simpan Undangan"
            >
              <Save className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvitation;
