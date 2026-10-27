"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type LiquidMetalButtonProps = {
  label: string;
  phone: string;
};

export function LiquidMetalButton({ label, phone }: LiquidMetalButtonProps) {
  const shaderRef = useRef<HTMLDivElement>(null);
  const shaderMountRef = useRef<{ destroy?: () => void; setSpeed?: (speed: number) => void } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ phone: "", message: "" });

  useEffect(() => {
    if (!shaderRef.current) return undefined;

    shaderMountRef.current = new ShaderMount(
      shaderRef.current,
      liquidMetalFragmentShader,
      {
        u_repetition: 4,
        u_softness: 0.5,
        u_shiftRed: 0.3,
        u_shiftBlue: 0.3,
        u_distortion: 0,
        u_contour: 0,
        u_angle: 45,
        u_scale: 8,
        u_shape: 1,
        u_offsetX: 0.1,
        u_offsetY: -0.1,
      },
      undefined,
      0.6,
    );

    return () => {
      shaderMountRef.current?.destroy?.();
      shaderMountRef.current = null;
    };
  }, []);

  const setSpeed = (speed: number) => shaderMountRef.current?.setSpeed?.(speed);

  const closeModal = () => {
    setIsOpen(false);
    setSubmitted(false);
  };

  return (
    <>
      <button
      className="liquid-call-button"
      type="button"
      aria-label={label}
      onClick={() => setIsOpen(true)}
      onMouseEnter={() => {
        setIsHovered(true);
        setSpeed(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
        setSpeed(0.6);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      >
      <span className="liquid-call-button-shader" ref={shaderRef} aria-hidden="true" />
      <span className="liquid-call-button-content">
        <Phone size={17} strokeWidth={2.2} />
        <span>{label}</span>
      </span>
      <span
        className={`liquid-call-button-surface ${isHovered ? "is-hovered" : ""} ${
          isPressed ? "is-pressed" : ""
        }`}
        aria-hidden="true"
      />
    </button>

    {isOpen && (
      <div className="call-modal-backdrop" role="presentation" onClick={closeModal}>
        <div
          className="call-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="call-modal-title"
          onClick={(event) => event.stopPropagation()}
        >
          <button className="call-modal-close" type="button" onClick={closeModal} aria-label="Close">
            ×
          </button>
          {submitted ? (
            <div className="call-modal-success">
              <span className="call-modal-kicker">Request received</span>
              <h2 id="call-modal-title">We’ll call you back.</h2>
              <p>Thanks. A master will contact you shortly.</p>
              <button className="button button-dark" type="button" onClick={closeModal}>
                Done
              </button>
            </div>
          ) : (
            <>
              <span className="call-modal-kicker">Talk to a master</span>
              <h2 id="call-modal-title">How can we help?</h2>
              <p className="call-modal-description">
                Leave your number and a short message, or call us right now.
              </p>
              <form
                className="call-modal-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (form.phone.trim()) setSubmitted(true);
                }}
              >
                <label>
                  Phone number
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                    placeholder="(312) 555-0123"
                    autoComplete="tel"
                    required
                  />
                </label>
                <label>
                  Message <span>(optional)</span>
                  <textarea
                    value={form.message}
                    onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                    placeholder="What appliance needs attention?"
                    rows={3}
                    maxLength={500}
                  />
                </label>
                <div className="call-modal-actions">
                  <button className="button button-red" type="submit">
                    Request a call
                  </button>
                  <a className="button button-dark" href={`tel:${phone}`}>
                    Call now
                  </a>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    )}
    </>
  );
}
