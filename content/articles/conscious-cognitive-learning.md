---
title: Conscious-Cognitive Learning
date: 2026-09-04
summary: A foundation for the Majesta Conscious-Cognitive Model. Existing architectures set consciousness aside; this note defines conscious-cognitive learning so those processes can be modelled, implemented, and measured.
---

## Motivation

Definitions of consciousness have been attempted and are being re-attempted every few years. There is also no shortage of one's own subjective beliefs on what we mean by the term combined with the fact that definitions and theories do not follow a straight line but rather explore and approach the subject from vastly different angles.

I propose that existing cognitive architectures have largely ignored and purposely excluded the modelling of conscious processes to achieve their goals. This very much stems from their intended purpose:

> A cognitive architecture is a broadly-scoped, domain-generic computational cognitive model, capturing the essential structures and processes of the mind, to be used for a broad, multiple-level, multiple-domain analysis of behavior.

(See Sun, 2004, *Philosophical Psychology*)

With this definition of the grand scope of such architectures in mind it is clear that the architect rather not risk the overall plausibility of the system by trying to model exactly the one aspect that seems to escape clear scientific definition and measurability.

On the other hand, Machine Learning algorithms that have been produced are so vastly different to how biological systems of cognition are constructed that one will find it unsatisfactory when trying to understand consciousness in cognitive systems from the computer science view. For a succinct comparison we use a summary often employed by Joscha Bach (See, [bach.ai](https://bach.ai)):

| Current AI Algorithms | Minds |
| --- | --- |
| Outside-in design | Inside-out design |
| Stabilized by deterministic substrate | Self Organization |
| Decoupled & static data | Environmental coupling & dynamics |
| Prediction | Coherence |
| ML-training | Continuous development |

The motivation behind this theory is to lay the foundation for the Majesta Conscious-Cognitive Model. The goal is to establish theoretical definitions so that I can subsequently start building a model and integrate existing cognitive architectures thus overcoming limitations of prior attempts such as Global Workspace Theory (GWT). I want to ultimately be able to use the model to proactively explore, apply and measure specifically conscious processes in cognitive systems.

The aim is therefore not to define consciousness from a strict philosophical or even psychological standpoint. Rather, we approach our definition from the perspective of cognitive architectures, which ultimately present us with a toolset that makes it possible to model cognitive processes. By modelling and ultimately implementing conscious-cognitive systems I aim to support the understanding of learning specifically and be able to illustrate how a subjective experience in a cognitive system may arise.

## The hard problem

The first important aspect we need to proactively address is what has been termed the hard problem of consciousness. This term refers to the challenge of explaining how and why we have subjective, conscious experiences. David Chalmers, an Australian philosopher and cognitive scientist, coined the term in 1995. Chalmers contrasted the "hard problem" with what he called the "easy problems" of consciousness.

The easy problems, according to Chalmers, include explaining the ability to discriminate, integrate information, report mental states, focus attention, and control behaviour. He argued that these could potentially be solved by standard methods of cognitive science and neuroscience.

The hard problem, on the other hand, is about explaining why we have qualitative, subjective experiences at all. Why does it feel like something to be conscious? Why do we have an inner mental life? This problem is considered "hard" because it seems to resist explanation in terms of physical mechanisms alone.

I argue that subjectivity and the judgement of the output of processes leading to subjectivity in a theory of consciousness can be addressed when we model such processes as a distinct set of processes within the learning mechanisms of a cognitive system. In order to arrive at our defining principles I shall first put forward essential philosophical viewpoints that will support the theory. Then, I will discuss learning considerations that complex cognitive systems share with each other when they are viewed as a type of information processing system and finally, by joining the aforementioned, arrive at solid theoretical viewpoints.

## Foundations in Philosophy

We must ask first then:

> For any given conscious system that we could possibly conceive and ultimately judge to be conscious, what are the foundational traits of such a system?

Now we know what to look for in philosophy and do not need to venture off. We see that we are able to focus on exactly two aspects that are foundational in philosophy and more specifically require a definition by the philosopher before a relevant metaphysical system can indeed be constructed. We find that space and time exactly are these two pillars and to our advantage find that Immanuel Kant, who brought philosophy into modernity with *The Critique of Pure Reason* in 1787 is bound by the fact that he needs to define and draw conclusions from his definitions before he can begin to build and expand his ideas. We do not need to argue in favour of synthetic a priori knowledge or what implications such findings have for morality. We remember we are only interested due to our pursuit of a conscious-cognitive model.

Firstly, we cannot ignore the fact that space and time have to be defined first as the very construction and philosophy of mind depend on it which in turn are needed for any model of consciousness. Secondly, we are particularly interested in the conclusions from the definitions themselves as they present the first opportunity to reason about any system that may be constructed from such a theory.

In his Critique Kant argues that space and time are not objective features of reality, but rather a priori intuitions - fundamental structures of human sensibility. He posits that space and time are the necessary frameworks through which we perceive and experience the world. They are not derived from experience, but are preconditions for any possible experience. They shape how we perceive objects and events, but do not exist as things-in-themselves independent of human cognition. This view forms a crucial part of Kant's transcendental idealism, distinguishing between the world as it appears to us (phenomena) and the world as it is in itself (noumena). (Refer to p. 90 onwards for complete definitions)

With a summary of his definitions presented we can immediately focus on the conclusions with regards to Space p. 92:

> (a) Space does not represent any property of objects as things in themselves, nor does it represent them in their relations to each other; in other words, space does not represent to us any determination of objects such as attaches to the objects themselves, and would remain, even though all subjective conditions of the intuition were abstracted. For neither absolute nor relative determinations of objects can be intuited prior to the existence of the things to which they belong, and therefore not a priori.
>
> (b) Space is nothing else than the form of all phenomena of the external sense, that is, the subjective condition of the sensibility, under which alone external intuition is possible.

And we continue until we reach the conclusions on Time:

> (b) Time is nothing else than the form of the internal sense, that is, of the intuitions of self and of our internal state. For time cannot be any determination of outward phenomena. It has to do neither with shape nor position; on the contrary, it determines the relation of representations in our internal state. And precisely because this internal intuition presents to us no shape or form, we endeavour to supply this want by analogies, and represent the course of time by a line progressing to infinity, the content of which constitutes a series which is only of one dimension; and we conclude from the properties of this line as to all the properties of time, with this single exception, that the parts of the line are coexistent, whilst those of time are successive. From this it is clear also that the representation of time is itself an intuition, because all its relations can be expressed in an external intuition.

Following these immediate conclusions from the definitions we extract the first realisation about the internal workings of a conscious system:

**Any system that is able to be observed as conscious must be a system capable to construct its space and relate items therein by time.**

The world model of such a system can then be thought of to be limited by these constraints as well. They are therefore not just abstractions but very real considerations we must deal with later on in our modelling and architecture.

With these internal aspects outlined we now continue along and arrive ca. 140 years later with the help of Heidegger in *Being and Time* at the statement when discussing Dasein (the subject) in space. We posit this to be a satisfactory answer to our question without having to venture off further into philosophy and risk losing our goal out of sight. *Being and Time* (p. 146):

> Space is not in the subject, nor is the world in space. Space is rather 'in' the world in so far as space has been disclosed by that Being-in-the-world which is constitutive for Dasein. Space is not to be found in the subject, nor does the subject observe the world 'as if' that world were in a space; but the 'subject' (Dasein), if well understood ontologically, is spatial.

## Learning in the context of information processing systems

We have been able to baseline some fundamental aspects of what we term conscious-cognitive systems through philosophy. It is time to turn to learning and address the hard problem directly. We approach this subject now in a similar fashion and ask a question to set us on the right path of reasoning:

> Why are there cognitive systems we consider conscious?

By including cognitive systems in the question itself we limit our possible problem space and should be able to deduce a viewpoint. We start off with the hypothesis that all cognitive systems can be viewed as information-processing systems, which should not be too controversial.

Now, it has further been hypothesised that all natural information-processing systems share a common base and we use exactly this point that is reiterated by Ritter. (compare *In Order to Learn*, p 215) This base itself can be represented in many ways but in his thinking is defined by using the following 5 principles:

1. The Information Store Principle
2. The Borrowing and Reorganising Principle
3. The Randomness as Genesis Principle
4. The Narrow Limits of Change Principle
5. The Environment Organizing and Linking Principle

Specifically the The Borrowing and Reorganising Principle can now be used to start to describe why a cognitive system not only becomes subjective to interpret but also has a subjective experience. Quoting the important aspect of the principle relating to the transfer process itself:

> The process is constructive in the sense that the information obtained is rarely, if ever, precise. New information obtained from other people by imitating, listening, or reading must be reorganised and combined with previous information held in long-term memory.

This principle alone already helps explain now how it can be that one system may process information in a different and therefore subjective way. It is not immediately clear however what causes the subjective experience in the system itself.

Henceforth, we need to remind ourselves we are in natural systems and remember that our only reliable reference point to judge consciousness in a cognitive system is indeed biological with the human cognitive system itself. Skipping the speculation of what types may be possible (compare: … We realise that increasing complexity causes different learning mechanisms to evolve. This is also argued by Richard Byrne, a primatologist at the University of St Andrews, in his book *The Thinking Ape: Evolutionary Origins of Intelligence* (1995), proposes:

> The evolution of learning abilities was likely driven by the need to cope with increasingly complex social and ecological environments.

In the first instance these learning mechanisms then cause the system to become intelligent giving the system the ability to form world models. We take this thinking now to its conclusion and posit that:

**At a given point of complexity of procedural rules and memory composition the cognitive system is able to form its own space and relate items therein by time. This ability necessitates the subject of the cognitive system itself (the Self) to have formed. This is also the point where the cognitive system is able to interpret its own experience as distinct from the experience of other cognitive systems (even though the systems may share the same underlying architecture).**

And we finalise:

**This very experience that can only arise in a complex cognitive system then gives rise to conscious-cognitive learning processes that occur within and also cause the subjective experience.**

## Conscious-cognitive learning processes

Now with the relevant groundwork done we can proceed with our theory. We incorporate our thoughts about the subjective experience and argue that:

1. A cognitive system when considered intelligent is able to make world models. It does so by creating (projecting) models of its world. These projections are simulations in that they are virtual and can only exist within the space of the system.

2. These projections require the virtual itself (the Self) of the system to disclose the relevant elements in the space and temporally ground the projection space.

3. This purposely avoids the cognitive system having to rely on subjective experiences from other complex cognitive systems in the execution of processes that make use of the projection space.

**Conscious-cognitive learning processes are thus learning processes that rely on projections within the cognitive system itself.**

Such a learning process is distinct from other learning processes in that it can, but does not necessarily need to be planned for, executed and evaluated by the system itself. The system is capable of partitioning parts of its problem space by itself against which it wants to evaluate if required.

A key part of this definition is the inclusion of the evaluation in the learning process itself. We usually judge the efficacy of a learning process by measuring the systems performance before and after the run of the learning process. This presents our link with the hard problem. In our desire to be able to evaluate and be able to explain what subjective experience is:

**As the space into which the system projects is fundamentally constructed by the cognitive system everything within that space is subjective to the cognitive system.**

**Conscious learning processes must exist in a system prior for it to be deemed conscious by an observation.**

The immediate implication:

**In order for us to ever be able to implement what would be referred to as a conscious system we must implement conscious-cognitive learning processes first.**
